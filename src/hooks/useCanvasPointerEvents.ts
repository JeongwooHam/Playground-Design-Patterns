import { useEffect, type RefObject } from "react";
import type {
  DrawingContextType,
  PointType,
  Tool,
  ToolInitializerType,
} from "../types/toolInstance.type";
import { getPoint } from "../utils/point";

/**
 * 공통 포인터 이벤트 처리 함수.
 *
 * - activeTool이 없으면 아무 동작도 하지 않습니다.
 * - checkTarget이 true일 때, 이벤트 타겟이 canvasRef.current와 다르면 콜백을 실행하지 않습니다.
 * - 조건을 모두 통과하면 getPoint로 좌표를 구해 콜백에 전달합니다.
 *
 * @param e         Pointer 이벤트 객체
 * @param activeTool 현재 활성화된 도구 인스턴스 (없으면 무시)
 * @param canvasRef  canvas DOM 참조 객체
 * @param ctx        드로잉 컨텍스트
 * @param callback   좌표와 컨텍스트를 인자로 받는 도구별 콜백 함수
 * @param checkTarget (기본값: true) 타겟 일치 여부 검사 여부
 */
const handlePointerEvent = (
  e: PointerEvent,
  activeTool: Tool<ToolInitializerType> | null,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  ctx: DrawingContextType,
  callback?: (pt: PointType, ctx: DrawingContextType) => void,
  checkTarget: boolean = true
) => {
  const pt = getPoint(e);
  if (!activeTool) return;
  if (checkTarget && canvasRef.current !== e.target) return;
  callback?.(pt, ctx);
};

export const useCanvasPointerEvents = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  activeTool: Tool<ToolInitializerType> | null,
  ctx: DrawingContextType
) => {
  const onPointerDown = (e: PointerEvent) =>
    handlePointerEvent(
      e,
      activeTool,
      canvasRef,
      ctx,
      activeTool?.onPointerDown
    );

  const onPointerMove = (e: PointerEvent) =>
    handlePointerEvent(
      e,
      activeTool,
      canvasRef,
      ctx,
      activeTool?.onPointerMove
    );

  const onPointerUp = (e: PointerEvent) =>
    handlePointerEvent(e, activeTool, canvasRef, ctx, activeTool?.onPointerUp);

  const onPointerLeave = (e: PointerEvent) =>
    handlePointerEvent(
      e,
      activeTool,
      canvasRef,
      ctx,
      activeTool?.onPointerUp,
      false
    );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [activeTool, ctx, canvasRef, getPoint]);
};
