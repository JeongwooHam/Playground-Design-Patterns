import { useState, type ChangeEvent } from "react";
import type { ToolType } from "../../../../types/buttonConfig.type";
import type { SetToolFunctionType } from "../../../../types/toolInstance.type";
import * as S from "./LineWidthPicker.css";

type LineWidthPickerProps = {
  tool: ToolType;
  setTool: SetToolFunctionType;
  min?: number;
  max?: number;
  isRendered?: boolean;
};

export const LineWidthPicker = ({
  tool,
  setTool,
  min = 1,
  max = 10,
  isRendered = false,
}: LineWidthPickerProps) => {
  const [lineWidth, setLineWidth] = useState<number>(1);
  const onLineWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newLineWidth = parseInt(e.target.value);
    if (isNaN(newLineWidth)) return;

    setLineWidth(newLineWidth);
    setTool(tool, { lineWidth: newLineWidth });
  };

  if (!isRendered) {
    return <></>;
  }

  return (
    <div className={S.Container}>
      <label>Line Width: {lineWidth}px</label>
      <input
        type="range"
        value={lineWidth}
        onChange={onLineWidthChange}
        min={min}
        max={max}
      />
    </div>
  );
};
