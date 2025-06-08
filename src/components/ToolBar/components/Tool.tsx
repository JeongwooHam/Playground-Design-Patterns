import type { FC } from "react";
import type { ToolButtonType } from "../../../types/tools.type";
import * as S from "./Tool.css";

type ToolButtonProps = {
  config: ToolButtonType;
  onClick: () => void;
  color?: string;
  isCurrentTool?: boolean;
  className?: string;
};

export const Tool: FC<ToolButtonProps> = ({
  config,
  onClick,
  color,
  isCurrentTool = false,
  className,
}) => {
  const { icon: Icon, iconSize, label } = config;
  return (
    <button
      onClick={onClick}
      title={`${label}`}
      aria-label={label}
      type="button"
      aria-pressed={isCurrentTool}
      data-tool={config.type}
      className={
        S.Button +
        (className ? ` ${className}` : "") +
        (isCurrentTool ? " active" : "")
      }
    >
      <Icon size={iconSize} color={color} />
    </button>
  );
};
