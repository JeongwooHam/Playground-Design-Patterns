import type {
  DrawingContextType,
  PointType,
  Tool,
  ToolInitializerType,
} from "../types/toolInstance.type";
import { getDistance } from "../utils/point";

interface BrushToolOptions extends ToolInitializerType {
  id: string;
  color?: string;
  lineWidth?: number;
  fillColor?: string;
}

export class BrushTool implements Tool {
  id: string;

  name: string = "Brush";
  color: string;
  lineWidth: number;
  fillColor: string;

  private isDrawing: boolean = false;
  private currentPath: PointType[] = [];
  private tempObjectId: string | null = null;

  private completeShape(path: PointType[]): PointType[] {
    if (path.length < 3) return path;

    const startPoint = path[0];

    return [...path, startPoint];
  }

  constructor(options: BrushToolOptions) {
    this.id = options.id;
    this.color = options.color || "#000000";
    this.lineWidth = options.lineWidth || 1;
    this.fillColor = options.fillColor || this.color + "50";
  }

  render(
    ctx: CanvasRenderingContext2D,
    shapeData: { path: PointType[]; completed?: boolean }
  ): void {
    if (shapeData.path.length < 2 || !ctx) return;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
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
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }

    ctx.stroke();
  }

  onPointerDown = (point: PointType, ctx: DrawingContextType) => {
    this.isDrawing = true;
    this.currentPath = [point];

    this.tempObjectId = `temp-${Date.now()}-${Math.random()}`;
    ctx.addTempObject({
      id: this.tempObjectId,
      toolId: this.id,
      shape: { path: this.currentPath, completed: false },
      properties: {
        color: this.color,
        lineWidth: this.lineWidth,
        fillColor: this.fillColor,
      },
    });
  };

  onPointerMove = (point: PointType, ctx: DrawingContextType) => {
    if (!this.isDrawing || !this.tempObjectId) return;

    const lastPoint = this.currentPath[this.currentPath.length - 1];
    const distance = getDistance(point, lastPoint);

    if (distance < 2) return;

    this.currentPath.push(point);

    ctx.updateTempObject(this.tempObjectId, {
      shape: { path: [...this.currentPath], completed: false },
    });
  };

  onPointerUp = (point: PointType, ctx: DrawingContextType) => {
    if (!this.isDrawing || !this.tempObjectId) return;
    this.isDrawing = false;
    this.currentPath.push(point);

    ctx.removeTempObject(this.tempObjectId);

    if (this.currentPath.length > 2) {
      const completedPath = this.completeShape(this.currentPath);

      ctx.addObject({
        toolId: this.id,
        shape: { path: completedPath, completed: true },
        properties: {
          color: this.color,
          lineWidth: this.lineWidth,
          fillColor: this.fillColor,
        },
      });
    }
    this.currentPath = [];
    this.tempObjectId = null;
  };

  updateOptions(options?: Partial<BrushToolOptions>) {
    if (!options) return;
    // fillColor의 경우 지정되지 않으면 color의 50% opacity를 가지는 값으로 대체합니다.
    if (options.fillColor) {
      this.fillColor = options.fillColor;
    } else if (options.color) {
      this.fillColor = options.color + "50";
    }

    Object.assign(this, options);
  }
}
