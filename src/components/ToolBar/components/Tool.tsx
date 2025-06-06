import type { FC } from "react";
import type { ToolConfigType } from "../../../types/tools.type";
import * as S from "./Tool.css";

type ToolButtonProps = {
  config: ToolConfigType;
  onClick: () => void;
  isCurrentTool?: boolean;
  className?: string;
};

export const Tool: FC<ToolButtonProps> = ({
  config,
  onClick,
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
      data-tool={config.id}
      className={
        S.Button +
        (className ? ` ${className}` : "") +
        (isCurrentTool ? " active" : "")
      }
    >
      <Icon size={iconSize} />
    </button>
  );
};
