import clsx from "clsx";
import type { ToolButtonType } from "../../../../types/buttonConfig.type";
import * as S from "./Tool.css";

type ToolButtonProps = {
  config: ToolButtonType;
  onClick: () => void;
  color?: string;
  isCurrentTool?: boolean;
  className?: string;
};

export const Tool = ({
  config,
  onClick,
  color,
  isCurrentTool = false,
  className,
}: ToolButtonProps) => {
  const { icon: Icon, iconSize, label } = config;
  return (
    <button
      onClick={onClick}
      title={`${label}`}
      aria-label={label}
      type="button"
      aria-pressed={isCurrentTool}
      data-tool={config.type}
      className={clsx(S.Button, className, { [S.Active]: isCurrentTool })}
    >
      <Icon size={iconSize} color={!isCurrentTool ? "lightgray" : color} />
    </button>
  );
};
