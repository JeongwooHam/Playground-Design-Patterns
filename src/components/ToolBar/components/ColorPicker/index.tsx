import { useState, type ChangeEvent } from "react";
import type { ToolType } from "../../../../types/buttonConfig.type";
import type { ColorType } from "../../../../types/color.type";
import type { SetToolFunctionType } from "../../../../types/toolInstance.type";
import { isColorType } from "../../../../utils/color";
import * as S from "./ColorPicker.css";

type ColorPickerProps = {
  tool: ToolType;
  setTool: SetToolFunctionType;
  isRendered?: boolean;
};

export const ColorPicker = ({
  tool,
  setTool,
  isRendered = false,
}: ColorPickerProps) => {
  const [color, setColor] = useState<ColorType>("#000000");
  const onColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isColorType(e.target.value)) return;

    setColor(e.target.value);
    setTool(tool, { color: e.target.value });
  };

  if (!isRendered) {
    return <></>;
  }

  return (
    <div className={S.Container}>
      <label>color</label>
      <input type="color" value={color} onChange={onColorChange} />
    </div>
  );
};
