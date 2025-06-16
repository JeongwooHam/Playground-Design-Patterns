import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  DrawingContextType,
  DrawingObjectType,
  TempDrawingObjectType,
  Tool,
  ToolConstructorType,
  ToolInitializerType,
} from "../types/toolInstance.type";
import { getPoint } from "../utils/point";

type ToolRegistryType = {
  [id: string]: ToolConstructorType<Tool, ToolInitializerType>;
};

export const useDrawing = (toolRegistry: ToolRegistryType) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [objects, setObjects] = useState<DrawingObjectType[]>([]);
  const [tempObjects, setTempObjects] = useState<TempDrawingObjectType[]>([]);

  const [history, setHistory] = useState<DrawingObjectType[][]>([]);
  const [redoStack, setRedoStack] = useState<DrawingObjectType[][]>([]);

  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const addObject = (obj: DrawingObjectType) => {
    setObjects((prevObjects) => {
      setHistory((h) => [...h, prevObjects]);
      setRedoStack([]);
      return [...prevObjects, obj];
    });
  };

  const addTempObject = (obj: TempDrawingObjectType) => {
    setTempObjects((prev) => [...prev, obj]);
  };

  const updateTempObject = (
    id: string,
    updates: Partial<Omit<TempDrawingObjectType, "id">>
  ) => {
    setTempObjects((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, updates } : obj))
    );
  };

  const removeObject = (prev: (obj: DrawingObjectType) => boolean) => {
    setObjects((prevObjects) => {
      setHistory((h) => [...h, prevObjects]);
      setRedoStack([]);
      return prevObjects.filter((o) => !prev(o));
    });
  };

  const removeTempObject = (id: string) => {
    setTempObjects((prev) => prev.filter((obj) => obj.id !== id));
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
      addTempObject,
      updateTempObject,
      removeObject,
      removeTempObject,
      getCurrentObjects,
      getToolInstance,
      canvasRef,
    }),
    [objects, activeTool]
  );

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setRedoStack([objects, ...redoStack]);
    setObjects(prev);
  }, [history, objects, redoStack]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const [next, ...rest] = redoStack;
    setHistory([...history, objects]);
    setRedoStack(rest);
    setObjects(next);
  }, [redoStack, history, objects]);

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

  const onPointerLeave = useCallback(
    (e: PointerEvent) => {
      const pt = getPoint(e);
      if (activeTool) {
        activeTool.onPointerUp?.(pt, ctx);
      }
    },
    [activeTool, ctx]
  );

  useEffect(
    function onHandleEventListener() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);

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
    },
    [onPointerDown, onPointerMove, onPointerUp, onPointerLeave]
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
          const tempToolInstance = new toolClass({
            ...obj.properties,
            id: obj.toolId,
          });
          tempToolInstance.render(context, obj.shape);
        }
      });

      tempObjects.forEach((obj) => {
        const toolClass = toolRegistry[obj.toolId];
        if (toolClass) {
          const tempToolInstance = new toolClass({
            ...obj.properties,
            id: obj.toolId,
          });
          tempToolInstance.render(context, obj.shape);
        }
      });
    },
    [objects, tempObjects, toolRegistry]
  );

  const setTool = useCallback(
    (toolId: string, options?: ToolInitializerType) => {
      const ToolClass = toolRegistry[toolId];
      if (!ToolClass) {
        console.warn(`Tool with ID '${toolId}' not found.`);
        setActiveTool(null);
        setActiveToolId(null);
        return;
      }

      if (!activeTool || activeTool.id !== toolId) {
        setActiveTool(new ToolClass({ id: toolId, ...options }));
        setActiveToolId(toolId);
        return;
      }

      if (!options) {
        return;
      }

      if (typeof activeTool.updateOptions !== "function") {
        console.warn(`Tool '${toolId}' does not support 'updateOptions'.`);
        setActiveTool(new ToolClass({ ...options }));
        return;
      }

      activeTool.updateOptions(options);
    },
    [toolRegistry, activeTool]
  );

  return {
    canvasRef,
    setTool,
    activeToolId,
    undo,
    redo,
    canUndo: history.length > 0,
    canRedo: redoStack.length > 0,
    objects,
  };
};
