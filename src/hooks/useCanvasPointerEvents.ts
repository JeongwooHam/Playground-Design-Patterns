import { useEffect, type RefObject } from "react";
import type {
  DrawingContextType,
  Tool,
  ToolInitializerType,
} from "../types/toolInstance.type";
import { getPoint } from "../utils/point";

const isCanvasEventValid = (
  e: PointerEvent,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  activeTool: Tool<ToolInitializerType> | null
) => !!activeTool && canvasRef.current === e.target;

export const useCanvasPointerEvents = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  activeTool: Tool<ToolInitializerType> | null,
  ctx: DrawingContextType
) => {
  const onPointerDown = (e: PointerEvent) => {
    const pt = getPoint(e);
    if (isCanvasEventValid(e, canvasRef, activeTool)) {
      activeTool!.onPointerDown?.(pt, ctx);
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    const pt = getPoint(e);
    if (isCanvasEventValid(e, canvasRef, activeTool)) {
      activeTool!.onPointerMove?.(pt, ctx);
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    const pt = getPoint(e);
    if (isCanvasEventValid(e, canvasRef, activeTool)) {
      activeTool!.onPointerUp?.(pt, ctx);
    }
  };

  const onPointerLeave = (e: PointerEvent) => {
    const pt = getPoint(e);
    if (activeTool) {
      activeTool.onPointerUp?.(pt, ctx);
    }
  };

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
