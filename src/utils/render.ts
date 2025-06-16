import type {
  DrawingObjectType,
  TempDrawingObjectType,
  ToolRegistryType,
} from "../types/toolInstance.type";

export const renderObjectsToCanvas = (
  canvas: HTMLCanvasElement | null,
  objects: DrawingObjectType[],
  tempObjects: TempDrawingObjectType[],
  toolRegistry: ToolRegistryType
) => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 정식 객체 렌더링
  for (const obj of objects) {
    const ToolClass = toolRegistry[obj.toolId];
    if (ToolClass) {
      const tool = new ToolClass(obj.properties as any);
      tool.render(ctx, obj.shape, obj.properties);
    }
  }

  // 임시 객체 렌더링
  for (const temp of tempObjects) {
    const ToolClass = toolRegistry[temp.toolId];
    if (ToolClass) {
      const tool = new ToolClass(temp.properties as any);
      tool.render(ctx, temp.shape, temp.properties);
    }
  }
};
