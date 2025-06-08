import type { IconType } from "react-icons";

export type PointType = { x: number; y: number };

export type ToolType = "pencil" | "brush" | "eraser" | string;

export type ToolButtonType = {
  type: ToolType;
  label: string;
  icon: IconType;
  iconSize?: number;
  color?: string;
  [key: string]: unknown;
};

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
  removeObject: (
    isRemoveTarget: (object: DrawingObjectType) => boolean
  ) => void;
  getCurrentObjects: () => DrawingObjectType[];
  getToolInstance: (toolId: string) => Tool | undefined;
};

export type DrawingObjectType = {
  toolId: string;
  shape: unknown;
  properties: Record<string, unknown>;
};
