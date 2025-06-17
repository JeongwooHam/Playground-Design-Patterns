import type {
  Tool,
  ToolInitializerType,
  ToolRegistryType,
} from "../types/toolInstance.type";

export const setToolInstance = (
  toolRegistry: ToolRegistryType,
  toolId: string,
  options: ToolInitializerType | undefined,
  activeTool: Tool | null,
  setActiveTool: (tool: Tool | null) => void,
  setActiveToolId: (id: string | null) => void
) => {
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
};
