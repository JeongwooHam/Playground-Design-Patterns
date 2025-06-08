import { useMemo, type FC } from "react";
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

export const ToolBar: FC<ToolButtonType> = ({ setTool, activeToolId }) => {
  const handleToolChange = (tool: ToolType) => {
    setTool(tool);
  };

  return (
    <div className={S.Container}>
      <Pen activeToolId={activeToolId} setTool={handleToolChange} />
      <Brush activeToolId={activeToolId} setTool={handleToolChange} />
      <Eraser activeToolId={activeToolId} setTool={handleToolChange} />
    </div>
  );
};

type ToolProps = {
  activeToolId: string | null;
  setTool: SetToolFunctionType;
};

const Pen: FC<ToolProps> = ({ activeToolId, setTool }) => {
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
        setTool={setTool}
        isRendered={isCurrentTool}
      />
      <LineWidthPicker
        tool={TOOL_CONFIG.pen.type}
        setTool={setTool}
        min={1}
        max={10}
        isRendered={isCurrentTool}
      />
    </div>
  );
};

const Brush: FC<ToolProps> = ({ activeToolId, setTool }) => {
  const handleToolChange = (tool: ToolType) => {
    setTool(tool);
  };

  return (
    <Tool
      key={TOOL_CONFIG.brush.type}
      config={TOOL_CONFIG.brush}
      onClick={() => handleToolChange(TOOL_CONFIG.brush.type)}
      isCurrentTool={activeToolId === TOOL_CONFIG.brush.type}
    />
  );
};

const Eraser: FC<ToolProps> = ({ activeToolId, setTool }) => {
  const handleToolChange = (tool: ToolType) => {
    setTool(tool);
  };

  return (
    <Tool
      key={TOOL_CONFIG.eraser.type}
      config={TOOL_CONFIG.eraser}
      onClick={() => handleToolChange(TOOL_CONFIG.eraser.type)}
      isCurrentTool={activeToolId === TOOL_CONFIG.eraser.type}
    />
  );
};
