import type { ColorType } from "../types/color.type";

/**
 * 주어진 값이 유효한 색상 타입인지 확인하기 위한 타입 가드 함수입니다.
 *
 * 유효한 색상 타입은 HEX, RGB, RGBA 형식입니다.
 * @param value - 검사할 값
 * @returns 유효한 색상 타입이면 true, 그렇지 않으면 false를 반환합니다.
 */
export const isColorType = (value: string): value is ColorType => {
  if (typeof value !== "string") {
    return false;
  }
  // HEX 색상 형식인지 확인합니다.
  const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if (hexRegex.test(value)) {
    return true;
  }
  // RGB 색상 형식인지 확인합니다.
  const rgbRegex = /^rgb\(\s*(\d{1,3}\s*,\s*){2}\d{1,3}\s*\)$/;
  if (rgbRegex.test(value)) {
    return true;
  }
  // RGBA 색상 형식인지 확인합니다.
  const rgbaRegex = /^rgba\(\s*(\d{1,3}\s*,\s*){3}\d{1,3}\s*\)$/;
  if (rgbaRegex.test(value)) {
    return true;
  }
  return false;
};
