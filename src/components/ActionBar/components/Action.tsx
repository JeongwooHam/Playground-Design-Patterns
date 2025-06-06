import clsx from "clsx";
import type { FC } from "react";
import type { ActionConfigType } from "../../../types/actions.type";
import * as S from "./Action.css";

type ActionButtonProps = {
  config: ActionConfigType;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
};

export const Action: FC<ActionButtonProps> = ({
  config,
  onClick,
  isActive = false,
  className,
}) => {
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
