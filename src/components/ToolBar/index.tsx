import type { FC } from "react";
import { useShallow } from "zustand/shallow";
import { TOOL_CONFIG } from "../../constants/tools";
import { useToolStore } from "../../stores/tool";
import type { ToolType } from "../../types/tools.type";
import { Tool } from "./components/Tool";
import * as S from "./ToolBar.css";

export const ToolBar: FC = () => {
  const { currentTool, setCurrentTool } = useToolStore(
    useShallow((state) => ({
      currentTool: state.currentTool,
      setCurrentTool: state.setCurrentTool,
    }))
  );

  const handleToolChange = (tool: ToolType) => {
    setCurrentTool(tool);
  };

  return (
    <div className={S.Container}>
      {TOOL_CONFIG.map((config) => (
        <Tool
          key={config.id}
          config={config}
          onClick={() => handleToolChange(config.id)}
          isCurrentTool={currentTool === config.id}
        />
      ))}
    </div>
  );
};
