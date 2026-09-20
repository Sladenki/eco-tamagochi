import { useMemo, useState } from 'react';
import { bins, wasteItems, type WasteItem } from '../../data/gameData';
import { useGame } from '../../hooks/useGame';
import type { WasteType } from '../../types';

function shuffle<T>(list: T[]) {
  return [...list].sort(() => Math.random() - 0.5);
}

export function SortingGame() {
  const { sortWaste, sortFocus, setSortFocus, setView } = useGame();
  const queue = useMemo(() => {
    const all = shuffle(wasteItems);
    if (!sortFocus) return all;
    const first = all.find((item) => item.type === sortFocus);
    const rest = all.filter((item) => item.type !== sortFocus);
    return first ? [first, ...rest] : all;
  }, [sortFocus]);

  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const [correct, setCorrect] = useState(0);

  const current: WasteItem | undefined = queue[index];

  const choose = (bin: WasteType) => {
    if (!current || ok === true) return;
    const result = sortWaste(current.type, bin);
    setOk(result.ok);
    setMessage(result.message);
    if (result.ok) {
      setCorrect((n) => n + 1);
      window.setTimeout(() => {
        setMessage(null);
        setOk(null);
        if (index + 1 >= queue.length) {
          setDone(true);
          setSortFocus(null);
        } else {
          setIndex((n) => n + 1);
        }
      }, 900);
    }
  };

  if (done) {
    return (
      <div className="flex h-full flex-col justify-end pb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-clay">Поляна</p>
        <h2 className="font-display text-4xl text-forest">Всё нашло место</h2>
        <p className="mt-3 max-w-md text-ink/70">
          {correct} из {queue.length} — и воздух над ростком стал чуть легче.
        </p>
        <button
          type="button"
          onClick={() => setView('world')}
          className="mt-8 self-start rounded-full bg-forest px-5 py-3 text-sm text-paper"
        >
          Вернуться к растению
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="flex h-full flex-col">
      <p className="text-[11px] uppercase tracking-[0.2em] text-clay">Сортировка</p>
      <h2 className="font-display text-3xl text-forest md:text-4xl">Куда это положить?</h2>
      <p className="mt-2 max-w-lg text-sm text-ink/65">
        Не спеши. Если ошибёшься — объясним и дадим попробовать снова.
      </p>

      <div className="my-6 flex flex-1 flex-col items-center justify-center">
        <div className="rounded-[32px] bg-cream px-8 py-7 text-center">
          <p className="font-display text-2xl text-forest">{current.name}</p>
          <p className="mt-2 text-sm text-ink/55">{current.hint}</p>
        </div>
        <p className="mt-3 text-xs text-ink/40">
          {index + 1} из {queue.length}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {bins.map((bin) => (
          <button
            key={bin.id}
            type="button"
            onClick={() => choose(bin.id)}
            className="rounded-2xl bg-cream/80 px-3 py-3 text-left ring-1 ring-forest/5 transition hover:bg-cream"
          >
            <div className="text-sm font-medium text-forest">{bin.label}</div>
            <div className="text-[11px] text-ink/45">{bin.caption}</div>
          </button>
        ))}
      </div>

      {message && (
        <p className={`mt-4 text-sm ${ok ? 'text-leaf' : 'text-earth'}`}>{message}</p>
      )}
    </div>
  );
}
