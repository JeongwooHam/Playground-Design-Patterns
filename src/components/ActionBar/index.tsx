import type { FC } from "react";
import { ACTION_CONFIG } from "../../constants/actions";
import * as S from "./ActionBar.css";
import { Action } from "./components/Action";

export const ActionBar: FC = () => {
  return (
    <div className={S.Container}>
      {ACTION_CONFIG.map((config) => (
        <Action
          key={config.id}
          config={config}
          onClick={() => {}}
          isActive={false}
        />
      ))}
    </div>
  );
};
