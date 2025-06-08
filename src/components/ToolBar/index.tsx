import type { FC } from "react";
import { TOOL_CONFIG } from "../../constants/tools";
import type { BaseToolOptions, ToolType } from "../../types/tools.type";
import { Tool } from "./components/Tool";
import * as S from "./ToolBar.css";

type ToolButtonType = {
  setTool: (toolId: string, options?: BaseToolOptions) => void;
  activeToolId: string | null;
};

export const ToolBar: FC<ToolButtonType> = ({ setTool, activeToolId }) => {
  const handleToolChange = (tool: ToolType) => {
    setTool(tool);
  };

  return (
    <div className={S.Container}>
      <Tool
        key={TOOL_CONFIG.pencil.type}
        config={TOOL_CONFIG.pencil}
        onClick={() => handleToolChange(TOOL_CONFIG.pencil.type)}
        isCurrentTool={activeToolId === TOOL_CONFIG.pencil.type}
      />
      <Tool
        key={TOOL_CONFIG.brush.type}
        config={TOOL_CONFIG.brush}
        onClick={() => handleToolChange(TOOL_CONFIG.brush.type)}
        isCurrentTool={activeToolId === TOOL_CONFIG.brush.type}
      />
      <Tool
        key={TOOL_CONFIG.eraser.type}
        config={TOOL_CONFIG.eraser}
        onClick={() => handleToolChange(TOOL_CONFIG.eraser.type)}
        isCurrentTool={activeToolId === TOOL_CONFIG.eraser.type}
      />
    </div>
  );
};
