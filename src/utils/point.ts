import type { PointType } from "../types/toolInstance.type";

export const getPoint = (e: PointerEvent): PointType => {
  return { x: e.offsetX, y: e.offsetY };
};

/**
 * 두 점 사이의 유클리드 거리(직선 거리)를 계산하기 위한 유틸 함수입니다.
 * @param startPoint 첫 번째 점의 좌표
 * @param endPoint 두 번째 점의 좌표
 * @returns 두 점 사이의 거리 (number)
 */
export const getDistance = (startPoint: PointType, endPoint: PointType) =>
  Math.sqrt(
    Math.pow(startPoint.x - endPoint.x, 2) +
      Math.pow(startPoint.y - endPoint.y, 2)
  );
