import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  BaseToolOptions,
  DrawingContextType,
  DrawingObjectType,
  Tool,
  ToolConstructorType,
} from "../types/tools.type";
import { getPoint } from "../utils/point";

type ToolRegistryType = {
  [id: string]: ToolConstructorType<any, any>;
};

export const useDrawing = (toolRegistry: ToolRegistryType) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [objects, setObjects] = useState<DrawingObjectType[]>([]);

  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const addObject = (obj: DrawingObjectType) => {
    setObjects((prevObjects) => {
      return [...prevObjects, obj];
    });
  };

  const removeObject = (pred: (obj: DrawingObjectType) => boolean) => {
    setObjects((prevObjects) => {
      return prevObjects.filter((o) => !pred(o));
    });
  };

  const getCurrentObjects = () => objects;

  const getToolInstance = (toolId: string) => {
    if (activeTool && activeTool.id === toolId) {
      return activeTool;
    }
    return undefined;
  };

  const ctx: DrawingContextType = useMemo(
    () => ({
      addObject,
      removeObject,
      getCurrentObjects,
      getToolInstance,
    }),
    [objects, activeTool]
  );

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      const pt = getPoint(e);
      if (activeTool && canvasRef.current === e.target) {
        activeTool.onPointerDown?.(pt, ctx);
      }
    },
    [activeTool, ctx]
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const pt = getPoint(e);
      if (activeTool && canvasRef.current === e.target) {
        activeTool.onPointerMove?.(pt, ctx);
      }
    },
    [activeTool, ctx]
  );

  const onPointerUp = useCallback(
    (e: PointerEvent) => {
      const pt = getPoint(e);
      if (activeTool && canvasRef.current === e.target) {
        activeTool.onPointerUp?.(pt, ctx);
      }
    },
    [activeTool, ctx]
  );

  useEffect(
    function onHandleEventListener() {
      const canvas = canvasRef.current;
      console.log("useDrawing: canvas", canvas);
      if (!canvas) return;

      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerUp);

      return () => {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
      };
    },
    [onPointerDown, onPointerMove, onPointerUp]
  );

  useEffect(
    function renderObjectsToCanvas() {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      objects.forEach((obj) => {
        const toolClass = toolRegistry[obj.toolId];
        if (toolClass) {
          const tempToolInstance = new toolClass(obj.properties);
          tempToolInstance.render(context, obj.shape);
        }
      });
    },
    [objects, toolRegistry]
  );

  const setTool = useCallback(
    (toolId: string, options: BaseToolOptions = {}) => {
      const ToolClass = toolRegistry[toolId];
      if (ToolClass) {
        setActiveTool(new ToolClass({ id: toolId, ...options }));
        setActiveToolId(toolId);
      } else {
        console.warn(`Tool with ID '${toolId}' not found.`);
      }
    },
    [toolRegistry]
  );

  return {
    canvasRef,
    setTool,
    activeToolId,
    objects,
  };
};
