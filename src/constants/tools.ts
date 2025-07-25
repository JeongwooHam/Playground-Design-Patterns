import { FaEraser, FaPencil, FaPenRuler } from "react-icons/fa6";
import type { ToolButtonType } from "../types/buttonConfig.type";

export const TOOL_CONFIG: Record<string, ToolButtonType> = {
  pen: {
    type: "pen",
    label: "Pen",
    icon: FaPencil,
    iconSize: 24,
    hasOptions: true,
  },
  brush: {
    type: "brush",
    label: "Brush",
    icon: FaPenRuler,
    iconSize: 24,
    hasOptions: true,
  },
  eraser: {
    type: "eraser",
    label: "Eraser",
    icon: FaEraser,
    iconSize: 28,
    hasOptions: false,
  },
} as const;
