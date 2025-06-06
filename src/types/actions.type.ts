import type { ComponentType, SVGProps } from "react";

export type Actiontype = "undo" | "redo";

export type ActionConfigType = {
  id: Actiontype;
  label: string;
  icon: ComponentType<{ size?: number } & SVGProps<SVGSVGElement>>;
  iconSize: number;
};
