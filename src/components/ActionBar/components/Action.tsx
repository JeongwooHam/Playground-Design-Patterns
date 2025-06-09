import clsx from "clsx";
import type { ActionConfigType } from "../../../types/buttonConfig.type";
import * as S from "./Action.css";

type ActionButtonProps = {
  config: ActionConfigType;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
};

export const Action = ({
  config,
  onClick,
  isActive = false,
  className,
}: ActionButtonProps) => {
  const { icon: Icon, iconSize, label } = config;
  return (
    <button
      onClick={onClick}
      title={`${label}`}
      aria-label={label}
      type="button"
      aria-pressed={isActive}
      data-tool={config.id}
      className={clsx(
        S.Button,
        className,
        isActive ? S.ActiveButton : S.DisabledButton
      )}
    >
      <Icon size={iconSize} />
      <span
        className={clsx(S.Label, isActive ? S.ActiveLabel : S.DisabledLabel)}
      >
        {label}
      </span>
    </button>
  );
};
