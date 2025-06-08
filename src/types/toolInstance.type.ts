import type { IconType } from "react-icons";

export type PointType = { x: number; y: number };

export interface BaseToolOptions {
  color?: string;
  lineWidth?: number;
}

export interface ToolInitializerType extends BaseToolOptions {
  id: string;
  name: string;
  icon?: IconType;
  [key: string]: unknown;
}

export interface Tool extends BaseToolOptions {
  id: string;
  name: string;
  icon?: IconType;
  render: (ctx: CanvasRenderingContext2D, shapeData: any) => void;
  onPointerDown?: (point: PointType, ctx: DrawingContextType) => void;
  onPointerMove?: (point: PointType, ctx: DrawingContextType) => void;
  onPointerUp?: (point: PointType, ctx: DrawingContextType) => void;
  hitTest?: (point: PointType, ctx: DrawingObjectType) => boolean;
}

export type ToolConstructorType<
  T extends Tool,
  O extends ToolInitializerType = ToolInitializerType
> = new (options: O) => T;

export type DrawingContextType = {
  addObject: (object: DrawingObjectType) => void;
  addTempObject: (object: TempDrawingObjectType) => void;
  updateTempObject: (
    id: string,
    updates: Partial<Omit<TempDrawingObjectType, "id">>
  ) => void;
  removeObject: (
    isRemoveTarget: (object: DrawingObjectType) => boolean
  ) => void;
  removeTempObject: (id: string) => void;
  getCurrentObjects: () => DrawingObjectType[];
  getToolInstance: (toolId: string) => Tool | undefined;
};

export type DrawingObjectType = {
  toolId: string;
  shape: unknown;
  properties: Record<string, unknown>;
};

export type TempDrawingObjectType = DrawingObjectType & { id: string };
