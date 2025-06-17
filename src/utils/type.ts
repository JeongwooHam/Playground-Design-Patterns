import type { PointType } from "../types/toolInstance.type";

/**
 * 주어진 shape가 { path: PointType[] } 형태인지 판별하는 타입 가드 함수
 *
 * @param shape - 검사할 객체
 * @returns shape가 { path: PointType[] } 타입이면 true, 아니면 false
 */
export const isPathShapeObject = (
  shape: unknown
): shape is { path: PointType[] } => {
  if (typeof shape !== "object" || shape === null) return false;
  const maybeShape = shape as { path?: unknown };
  return Array.isArray(maybeShape.path);
};
