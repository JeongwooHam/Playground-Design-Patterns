import type { IconType } from "react-icons";

export type Actiontype = "undo" | "redo";

export type ActionConfigType = {
  id: Actiontype;
  label: string;
  icon: IconType;
  iconSize: number;
};

export type ToolType = "pen" | "brush" | "eraser" | string;

export type ToolButtonType = {
  type: ToolType;
  label: string;
  icon: IconType;
  iconSize?: number;
  color?: string;
  [key: string]: unknown;
};
