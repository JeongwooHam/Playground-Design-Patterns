import type { PointType } from "../types/tools.type";

export const getPoint = (e: PointerEvent): PointType => {
  return { x: e.offsetX, y: e.offsetY };
};
