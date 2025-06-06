import { FaEraser, FaPencil, FaPenRuler } from "react-icons/fa6";
import type { ToolConfigType } from "../types/tools.type";

export const TOOL_CONFIG: ToolConfigType[] = [
  {
    id: "pencil",
    label: "Pencil",
    icon: FaPencil,
    iconSize: 24,
    hasOptions: true,
  },
  {
    id: "brush",
    label: "Brush",
    icon: FaPenRuler,
    iconSize: 24,
    hasOptions: true,
  },
  {
    id: "eraser",
    label: "Eraser",
    icon: FaEraser,
    iconSize: 28,
    hasOptions: true,
  },
] as const;
