import { useCallback, useState } from "react";

export const useHistory = <T>(initial: T[]) => {
  const [history, setHistory] = useState<T[][]>([initial]);
  const [index, setIndex] = useState<number>(0);

  const present = history[index];

  const set = useCallback(
    (updater: (prev: T[]) => T[]) => {
      setHistory((prevHistory) => {
        const newPresent = updater(prevHistory[index]);
        const nextHistory = [...prevHistory.slice(0, index + 1), newPresent];
        setIndex(nextHistory.length - 1);
        return nextHistory;
      });
    },
    [index]
  );

  const undo = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const redo = useCallback(() => {
    setIndex((i) => (i < history.length - 1 ? i + 1 : i));
  }, [history.length]);

  const canUndo = index > 0;
  const canRedo = index < history.length - 1;

  return {
    state: present,
    set,
    undo,
    redo,
    canUndo,
    canRedo,
    history,
    index,
  };
};
