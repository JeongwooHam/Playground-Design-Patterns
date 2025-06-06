import { create } from "zustand";
import type { ToolType } from "../types/tools.type";

interface ToolState {
  currentTool: ToolType | null;
}

interface ToolAction {
  setCurrentTool: (tool: ToolType | null) => void;
  resetCurrentTool: () => void;
}

export const useToolStore = create<ToolState & ToolAction>((set) => ({
  currentTool: null,
  setCurrentTool: (tool) => set({ currentTool: tool }),
  resetCurrentTool: () => set({ currentTool: null }),
}));
