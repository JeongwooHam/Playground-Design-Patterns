import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import type { ActionConfigType } from "../types/actions.type";

export const ACTION_CONFIG: Record<string, ActionConfigType> = {
  undo: {
    id: "undo",
    label: "취소",
    icon: FaArrowRotateLeft,
    iconSize: 24,
  },
  redo: {
    id: "redo",
    label: "복구",
    icon: FaArrowRotateRight,
    iconSize: 24,
  },
} as const;
