import type { ComponentType, SVGProps } from "react";

export type ToolType = "pencil" | "brush" | "eraser";

export type ToolConfigType = {
  id: ToolType;
  label: string;
  icon: ComponentType<{ size?: number } & SVGProps<SVGSVGElement>>;
  iconSize: number;
  hasOptions: boolean;
};

export type PenOptionsType = {
  color: string;
  size: number;
};

export type BrushOptionsType = {
  borderColor: string;
  fillColor: string;
  size: number;
};

export type EraserOptionsType = {
  size: number;
};

export type ToolOptions = {
  pencil: PenOptionsType;
  brush: BrushOptionsType;
  eraser: EraserOptionsType;
};
