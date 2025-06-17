import { useMemo } from "react";
import { TOOL_CONFIG } from "../../constants/tools";
import type { ToolType } from "../../types/buttonConfig.type";
import type { SetToolFunctionType } from "../../types/toolInstance.type";
import { ColorPicker } from "./components/ColorPicker";
import { LineWidthPicker } from "./components/LineWidthPicker";
import { Tool } from "./components/Tool";
import * as S from "./ToolBar.css";

type ToolButtonType = {
  setTool: SetToolFunctionType;
  activeToolId: string | null;
};

export const ToolBar = ({ setTool, activeToolId }: ToolButtonType) => {
  return (
    <div className={S.Container}>
      <Pen activeToolId={activeToolId} setTool={setTool} />
      <Brush activeToolId={activeToolId} setTool={setTool} />
      <Eraser activeToolId={activeToolId} setTool={setTool} />
    </div>
  );
};

type ToolProps = {
  activeToolId: string | null;
  setTool: SetToolFunctionType;
};

const Pen = ({ activeToolId, setTool }: ToolProps) => {
  const isCurrentTool = useMemo(() => {
    return activeToolId === TOOL_CONFIG.pen.type;
  }, [activeToolId]);

  const handleToolChange = (tool: ToolType) => {
    setTool(tool);
  };

  return (
    <div className={S.ToolBox}>
      <Tool
        key={TOOL_CONFIG.pen.type}
        config={TOOL_CONFIG.pen}
        onClick={() => handleToolChange(TOOL_CONFIG.pen.type)}
        isCurrentTool={isCurrentTool}
      />
      <ColorPicker
        tool={TOOL_CONFIG.pen.type}
        activeToolId={activeToolId}
        setTool={setTool}
        optionKey="color"
        label="선 색"
        isRendered={isCurrentTool}
      />
      <LineWidthPicker
        tool={TOOL_CONFIG.pen.type}
        activeToolId={activeToolId}
        setTool={setTool}
        optionKey="lineWidth"
        min={1}
        max={10}
        label="선 두께"
        isRendered={isCurrentTool}
      />
    </div>
  );
};

const Brush = ({ activeToolId, setTool }: ToolProps) => {
  const isCurrentTool = useMemo(() => {
    return activeToolId === TOOL_CONFIG.brush.type;
  }, [activeToolId]);

  const handleToolChange = (tool: ToolType) => {
    setTool(tool);
  };

  return (
    <div className={S.ToolBox}>
      <Tool
        key={TOOL_CONFIG.brush.type}
        config={TOOL_CONFIG.brush}
        onClick={() => handleToolChange(TOOL_CONFIG.brush.type)}
        isCurrentTool={activeToolId === TOOL_CONFIG.brush.type}
      />
      <ColorPicker
        tool={TOOL_CONFIG.brush.type}
        activeToolId={activeToolId}
        setTool={setTool}
        optionKey="color"
        label="선 색"
        isRendered={isCurrentTool}
      />
      <LineWidthPicker
        tool={TOOL_CONFIG.brush.type}
        activeToolId={activeToolId}
        setTool={setTool}
        optionKey="lineWidth"
        min={1}
        max={10}
        label="선 두께"
        isRendered={isCurrentTool}
      />
      <ColorPicker
        tool={TOOL_CONFIG.brush.type}
        activeToolId={activeToolId}
        setTool={setTool}
        optionKey="fillColor"
        label="채우기 색"
        isRendered={isCurrentTool}
      />
    </div>
  );
};

const Eraser = ({ activeToolId, setTool }: ToolProps) => {
  const isCurrentTool = useMemo(() => {
    return activeToolId === TOOL_CONFIG.eraser.type;
  }, [activeToolId]);

  const handleToolChange = (tool: ToolType) => {
    setTool(tool);
  };

  return (
    <div className={S.ToolBox}>
      <Tool
        key={TOOL_CONFIG.eraser.type}
        config={TOOL_CONFIG.eraser}
        onClick={() => handleToolChange(TOOL_CONFIG.eraser.type)}
        isCurrentTool={activeToolId === TOOL_CONFIG.eraser.type}
      />
      <ColorPicker
        tool={TOOL_CONFIG.eraser.type}
        activeToolId={activeToolId}
        setTool={setTool}
        optionKey="highlightColor"
        label="강조 색"
        isRendered={isCurrentTool}
      />
    </div>
  );
};
