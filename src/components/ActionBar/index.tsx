import type { FC } from "react";
import { ACTION_CONFIG } from "../../constants/actions";
import * as S from "./ActionBar.css";
import { Action } from "./components/Action";

type ActionButtonType = {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

export const ActionBar: FC<ActionButtonType> = ({
  undo,
  redo,
  canUndo,
  canRedo,
}) => {
  return (
    <div className={S.Container}>
      <Action config={ACTION_CONFIG.undo} onClick={undo} isActive={canUndo} />
      <Action config={ACTION_CONFIG.redo} onClick={redo} isActive={canRedo} />
    </div>
  );
};
