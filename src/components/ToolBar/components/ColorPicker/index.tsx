import { useEffect, useState, type ChangeEvent } from "react";
import type { ToolType } from "../../../../types/buttonConfig.type";
import type { ColorType } from "../../../../types/color.type";
import type { SetToolFunctionType } from "../../../../types/toolInstance.type";
import { isColorType } from "../../../../utils/color";
import * as S from "./ColorPicker.css";

type ColorPickerProps = {
  tool: ToolType;
  activeToolId: string | null;
  setTool: SetToolFunctionType;
  optionKey: string;
  isRendered?: boolean;
  label?: string;
};

export const ColorPicker = ({
  tool,
  activeToolId,
  setTool,
  optionKey,
  isRendered = false,
  label = "Color",
}: ColorPickerProps) => {
  const [color, setColor] = useState<ColorType>("#000000");
  const onColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isColorType(e.target.value)) return;
    if (!activeToolId) return;

    setColor(e.target.value);
    setTool(tool, { id: activeToolId, [optionKey]: e.target.value });
  };

  useEffect(
    function reset() {
      return () => setColor("#000000");
    },
    [isRendered]
  );

  if (!isRendered) {
    return <></>;
  }

  return (
    <div className={S.Container}>
      <label>
        {label}: <span style={{ color }}>{color}</span>
      </label>
      <input type="color" value={color} onChange={onColorChange} />
    </div>
  );
};
