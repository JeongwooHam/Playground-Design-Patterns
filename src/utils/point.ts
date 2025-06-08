import type { PointType } from "../types/toolInstance.type";

export const getPoint = (e: PointerEvent): PointType => {
  return { x: e.offsetX, y: e.offsetY };
};
