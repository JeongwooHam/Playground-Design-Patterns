import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  DrawingContextType,
  DrawingObjectType,
  TempDrawingObjectType,
  Tool,
  ToolInitializerType,
  ToolRegistryType,
} from "../types/toolInstance.type";
import { renderObjectsToCanvas } from "../utils/render";
import { setToolInstance } from "../utils/tool";
import { useCanvasPointerEvents } from "./useCanvasPointerEvents";
import { useHistory } from "./useHistory";

export const useDrawing = (toolRegistry: ToolRegistryType) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
    state: objects,
    set: setObjects,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory<DrawingObjectType>([]);

  const [tempObjects, setTempObjects] = useState<TempDrawingObjectType[]>([]);

  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const addObject = (obj: DrawingObjectType) => {
    setObjects((prevObjects) => {
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

  useCanvasPointerEvents(canvasRef, activeTool, ctx);

  useEffect(
    function render() {
      renderObjectsToCanvas(
        canvasRef.current,
        objects,
        tempObjects,
        toolRegistry
      );
    },
    [objects, tempObjects, toolRegistry]
  );

  const setTool = useCallback(
    (toolId: string, options?: ToolInitializerType) => {
      setToolInstance(
        toolRegistry,
        toolId,
        options,
        activeTool,
        setActiveTool,
        setActiveToolId
      );
    },
    [toolRegistry, activeTool]
  );

  return {
    canvasRef,
    setTool,
    activeToolId,
    undo,
    redo,
    canUndo,
    canRedo,
    objects,
  };
};
