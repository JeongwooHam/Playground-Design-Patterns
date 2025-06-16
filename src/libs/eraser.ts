import { z } from "zod";
import type {
  DrawingContextType,
  DrawingObjectType,
  PointType,
  Tool,
} from "../types/toolInstance.type";
import { getHighlightColor } from "../utils/color";
import { isPathShapeObject } from "../utils/type";

const EraserToolOptionsSchema = z.object({
  id: z.string(),
  highlightColor: z.string().optional(),
});

type EraserToolOptions = z.infer<typeof EraserToolOptionsSchema>;

export class EraserTool implements Tool {
  id: string;
  name: string = "Eraser";
  highlightColor: string;

  constructor(options: EraserToolOptions) {
    this.id = options.id;
    this.highlightColor = options.highlightColor || "#F7F008"; // 기본 강조 색은 노란색
  }

  private isPointWithinEraseThreshold(
    point: PointType,
    path: PointType[],
    lineWidth: number
  ): boolean {
    if (path.length < 2) return false;

    // 선 굵기에 따라 지우개의 범위를 결정합니다.
    const eraseThreshold = Math.max(lineWidth / 2 + 3, 8);

    for (let i = 0; i < path.length - 1; i++) {
      const startPoint = path[i];
      const endPoint = path[i + 1];

      const distance = this.getDistancePointToSegment(
        point,
        startPoint,
        endPoint
      );
      if (distance <= eraseThreshold) return true;
    }

    return false;
  }

  // 현재 포인터가 Path로 둘러싸인 다각형 내부에 있는지 검사하는 함수
  private isPointInPolygon(point: PointType, polygon: PointType[]): boolean {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x,
        yi = polygon[i].y;
      const xj = polygon[j].x,
        yj = polygon[j].y;
      const intersect =
        yi > point.y !== yj > point.y &&
        point.x <
          ((xj - xi) * (point.y - yi)) / (yj - yi + Number.EPSILON) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }

  // 점과 선분 사이의 최단 거리를 구하는 함수
  private getDistancePointToSegment(
    point: PointType,
    startPoint: PointType,
    endPoint: PointType
  ): number {
    const dxToStart = point.x - startPoint.x;
    const dyToStart = point.y - startPoint.y;
    const segmentDx = endPoint.x - startPoint.x;
    const segmentDy = endPoint.y - startPoint.y;

    const dot = dxToStart * segmentDx + dyToStart * segmentDy;
    const lenSquared = segmentDx * segmentDy + segmentDy * segmentDy;

    if (lenSquared === 0) {
      const distSquaredToStart = dxToStart * dxToStart + dyToStart * dyToStart;
      return Math.sqrt(distSquaredToStart);
    }

    let param = dot / lenSquared;

    let nearestX, nearestY;

    if (param < 0) {
      nearestX = startPoint.x;
      nearestY = startPoint.y;
    } else if (param > 1) {
      nearestX = endPoint.x;
      nearestY = endPoint.y;
    } else {
      nearestX = startPoint.x + param * segmentDx;
      nearestY = startPoint.y + param * segmentDy;
    }

    const dx = point.x - nearestX;
    const dy = point.y - nearestY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private isObjectNearPoint(point: PointType, obj: DrawingObjectType): boolean {
    if (isPathShapeObject(obj.shape)) {
      const lineWidth =
        typeof obj.properties.lineWidth === "number"
          ? obj.properties.lineWidth
          : 1;

      // line 근처인 경우
      if (this.isPointWithinEraseThreshold(point, obj.shape.path, lineWidth))
        return true;

      // 도형 내부인 경우
      if (
        "completed" in obj.shape &&
        obj.shape.completed &&
        this.isPointInPolygon(point, obj.shape.path)
      )
        return true;
    }

    return false;
  }

  render(
    ctx: CanvasRenderingContext2D,
    shapeData: any,
    properties?: any
  ): void {
    if (properties?.isEraserHighlight) {
      this.renderHighlight(ctx, shapeData, properties);
      return;
    }
  }

  private renderHighlight(
    ctx: CanvasRenderingContext2D,
    shapeData: any,
    properties: any
  ): void {
    if (!shapeData.path || shapeData.path.length < 2) return;
    const originalAlpha = ctx.globalAlpha;
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = this.highlightColor;
    ctx.lineWidth = (properties.originalLineWidth || 1) + 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(shapeData.path[0].x, shapeData.path[0].y);

    for (let i = 1; i < shapeData.path.length; i++) {
      const point = shapeData.path[i];
      ctx.lineTo(point.x, point.y);
    }

    if (shapeData.completed) {
      ctx.closePath();
    }

    ctx.stroke();
    ctx.globalAlpha = originalAlpha;
  }

  onPointerDown = (point: PointType, ctx: DrawingContextType) => {
    const objects = ctx.getCurrentObjects();

    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i];
      if (this.isObjectNearPoint(point, obj)) {
        ctx.removeObject((o) => o === obj);
        break;
      }
    }
  };

  onPointerMove = (point: PointType, ctx: DrawingContextType) => {
    const objects = ctx.getCurrentObjects();
    const tempId = "eraser-highlight";

    ctx.removeTempObject(tempId);
    let found = false;
    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i];

      if (this.isObjectNearPoint(point, obj)) {
        found = true;
        const highlightColor = obj.properties.highlightColor
          ? getHighlightColor(String(obj.properties.highlightColor))
          : this.highlightColor;
        ctx.addTempObject({
          id: tempId,
          toolId: this.id,
          shape: obj.shape,
          properties: {
            ...obj.properties,
            originalLineWidth: obj.properties.lineWidth,
            isEraserHighlight: true,
            highlightColor,
          },
        });
        break;
      }
    }

    // 지울 수 있는 영역이면 마우스 커서를 지우개 아이콘으로 변경
    const canvas = (ctx as any).canvasRef?.current as
      | HTMLCanvasElement
      | undefined;
    if (canvas) {
      canvas.style.cursor = found
        ? 'url("/assets/eraser.svg") 8 8, auto'
        : "default";
    }
  };

  onPointerUp = (_: PointType, ctx: DrawingContextType) => {
    ctx.removeTempObject("eraser-highlight");
  };

  updateOptions(options?: Partial<EraserToolOptions>) {
    if (!options) return;
    // 유효하지 않은 option 값에 대해 예외를 발생시킵니다.
    try {
      EraserToolOptionsSchema.partial().parse(options);
      Object.assign(this, options);
    } catch (e) {
      console.error("Invalid options provided to EraserTool:", e);
    }
  }
}
