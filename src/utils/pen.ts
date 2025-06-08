import type {
  DrawingContextType,
  PointType,
  Tool,
  ToolInitializerType,
} from "../types/tools.type";

interface PenToolOptions extends ToolInitializerType {
  id: string;
  color?: string;
  lineWidth?: number;
}

export class PenTool implements Tool {
  id: string;

  name: string = "Pen";
  color: string;
  lineWidth: number;

  private isDrawing: boolean = false;
  private lastPoint: PointType | null = null;
  private currentPath: PointType[] = [];

  constructor(options: PenToolOptions) {
    this.id = options.id;
    this.color = options.color || "#000000";
    this.lineWidth = options.lineWidth || 1;
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

  onPointerDown = (point: PointType) => {
    this.isDrawing = true;
    this.lastPoint = point;
    this.currentPath = [point];
  };

  onPointerMove = (point: PointType, ctx: DrawingContextType) => {
    if (!this.isDrawing || !this.lastPoint) return;
    this.currentPath.push(point);

    ctx.addObject({
      toolId: this.id,
      shape: { path: this.currentPath },
      properties: { color: this.color, lineWidth: this.lineWidth },
    });

    this.lastPoint = point;
  };

  onPointerUp = (point: PointType, ctx: DrawingContextType) => {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.currentPath.push(point);

    if (this.currentPath.length > 1) {
      ctx.addObject({
        toolId: this.id,
        shape: { path: [...this.currentPath] },
        properties: { color: this.color, lineWidth: this.lineWidth },
      });
    }
    this.currentPath = [];
    this.lastPoint = null;
  };
}
