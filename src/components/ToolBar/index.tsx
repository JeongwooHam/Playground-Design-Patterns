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
      <Pen activeToolId={activeToolId} handleToolChange={handleToolChange} />
      <Brush activeToolId={activeToolId} handleToolChange={handleToolChange} />
      <Eraser activeToolId={activeToolId} handleToolChange={handleToolChange} />
    </div>
  );
};

type ToolProps = {
  activeToolId: string | null;
  handleToolChange: (tool: ToolType) => void;
};

const Pen: FC<ToolProps> = ({ activeToolId, handleToolChange }) => {
  return (
    <Tool
      key={TOOL_CONFIG.pen.type}
      config={TOOL_CONFIG.pen}
      onClick={() => handleToolChange(TOOL_CONFIG.pen.type)}
      isCurrentTool={activeToolId === TOOL_CONFIG.pen.type}
    />
  );
};

const Brush: FC<ToolProps> = ({ activeToolId, handleToolChange }) => {
  return (
    <Tool
      key={TOOL_CONFIG.brush.type}
      config={TOOL_CONFIG.brush}
      onClick={() => handleToolChange(TOOL_CONFIG.brush.type)}
      isCurrentTool={activeToolId === TOOL_CONFIG.brush.type}
    />
  );
};

const Eraser: FC<ToolProps> = ({ activeToolId, handleToolChange }) => {
  return (
    <Tool
      key={TOOL_CONFIG.eraser.type}
      config={TOOL_CONFIG.eraser}
      onClick={() => handleToolChange(TOOL_CONFIG.eraser.type)}
      isCurrentTool={activeToolId === TOOL_CONFIG.eraser.type}
    />
  );
};
