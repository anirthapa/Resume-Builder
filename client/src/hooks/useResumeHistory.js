import { useCallback, useState } from "react";
export default function useResumeHistory(initializer) {
  const [history, setHistory] = useState(() => ({
    past: [],
    present: initializer(),
    future: [],
  }));
  const setData = useCallback(
    (next) =>
      setHistory((h) => {
        const present = typeof next === "function" ? next(h.present) : next;
        if (JSON.stringify(present) === JSON.stringify(h.present)) return h;
        return { past: [...h.past, h.present].slice(-60), present, future: [] };
      }),
    [],
  );
  const undo = useCallback(
    () =>
      setHistory((h) =>
        h.past.length
          ? {
              past: h.past.slice(0, -1),
              present: h.past.at(-1),
              future: [h.present, ...h.future],
            }
          : h,
      ),
    [],
  );
  const redo = useCallback(
    () =>
      setHistory((h) =>
        h.future.length
          ? {
              past: [...h.past, h.present],
              present: h.future[0],
              future: h.future.slice(1),
            }
          : h,
      ),
    [],
  );
  return [
    history.present,
    setData,
    {
      undo,
      redo,
      canUndo: !!history.past.length,
      canRedo: !!history.future.length,
    },
  ];
}
