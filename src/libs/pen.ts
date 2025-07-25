import { z } from "zod";
import type { DrawingContextType, PointType } from "../types/toolInstance.type";
import { getDistance } from "../utils/point";
import { ToolBase } from "./toolBase";

const PenToolOptionsSchema = z.object({
  id: z.string(),
  color: z.string().optional(),
  lineWidth: z.number().optional(),
});

type PenToolOptions = z.infer<typeof PenToolOptionsSchema>;

export class PenTool extends ToolBase<PenToolOptions> {
  static schema = PenToolOptionsSchema;
  static toolName = "Pen";

  color: string;
  lineWidth: number;

  private isDrawing: boolean = false;
  private lastPoint: PointType | null = null;
  private currentPath: PointType[] = [];
  private tempObjectId: string | null = null;

  constructor(options: PenToolOptions) {
    super(options);
    this.color = options.color ?? "#000000";
    this.lineWidth = options.lineWidth ?? 1;
  }

  render(
    ctx: CanvasRenderingContext2D,
    shapeData: { path: PointType[] }
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
    ctx.stroke();
  }

  onPointerDown = (point: PointType, ctx: DrawingContextType) => {
    this.isDrawing = true;
    this.lastPoint = point;
    this.currentPath = [point];

    this.tempObjectId = `temp-${Date.now()}-${Math.random()}`;
    ctx.addTempObject({
      id: this.tempObjectId,
      toolId: this.id,
      shape: { path: this.currentPath },
      properties: { color: this.color, lineWidth: this.lineWidth },
    });

    // 그리는 중 커서 스타일 변경
    const canvas = (ctx as any).canvasRef?.current as
      | HTMLCanvasElement
      | undefined;
    if (canvas) {
      const isSupported =
        CSS && CSS.supports && CSS.supports("cursor", "crosshair");
      if (isSupported) canvas.style.cursor = "crosshair";
    }
  };

  onPointerMove = (point: PointType, ctx: DrawingContextType) => {
    if (!this.isDrawing || !this.lastPoint || !this.tempObjectId) return;

    // 두 점 사이의 직선 거리(실제 거리)를 구합니다.
    const distance = getDistance(point, this.lastPoint);

    if (distance < 2) return;

    this.currentPath.push(point);

    ctx.updateTempObject(this.tempObjectId, {
      shape: { path: [...this.currentPath] },
    });

    this.lastPoint = point;
  };

  onPointerUp = (point: PointType, ctx: DrawingContextType) => {
    if (!this.isDrawing || !this.tempObjectId) return;
    this.isDrawing = false;
    this.currentPath.push(point);

    ctx.removeTempObject(this.tempObjectId);

    if (this.currentPath.length > 1) {
      ctx.addObject({
        toolId: this.id,
        shape: { path: [...this.currentPath] },
        properties: { color: this.color, lineWidth: this.lineWidth },
      });
    }
    this.currentPath = [];
    this.lastPoint = null;
    this.tempObjectId = null;

    // 커서 스타일 원복
    const canvas = (ctx as any).canvasRef?.current as
      | HTMLCanvasElement
      | undefined;
    if (canvas) {
      canvas.style.cursor = "default";
    }
  };
}
