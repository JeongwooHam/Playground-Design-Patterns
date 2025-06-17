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

/**
 * 주어진 HEX 색상 코드(#RRGGBB)를 기반으로 강조(하이라이트) 색상을 생성합니다.
 *
 * - 입력된 색상을 약간 더 밝은 RGB 색상으로 변환하여 반환합니다.
 * - 입력값이 올바른 HEX 코드가 아니면 기본 강조 색상("#F7F008")을 반환합니다.
 * - 반환값이 유효한 색상 형식이 아닐 경우에도 기본 강조 색상("#F7F008")을 반환합니다.
 *
 * @param baseColor - 기준이 되는 HEX 색상 코드 (예: "#336699")
 * @returns 강조(하이라이트)용 RGB 색상 문자열 또는 기본 강조 색상
 */
export const getHighlightColor = (baseColor: string): ColorType => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(baseColor)) return "#F7F008";
  const r = Math.min(
    255,
    Math.round(parseInt(baseColor.slice(1, 3), 16) * 1.3)
  );
  const g = Math.min(
    255,
    Math.round(parseInt(baseColor.slice(3, 5), 16) * 1.3)
  );
  const b = Math.min(
    255,
    Math.round(parseInt(baseColor.slice(5, 7), 16) * 1.3)
  );

  const result = `rgb(${r},${g},${b})`;
  if (isColorType(result)) return result;
  return "#F7F008";
};
