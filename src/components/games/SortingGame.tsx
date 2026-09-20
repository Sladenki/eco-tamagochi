import { motion, type PanInfo } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { bins, wasteItems, type WasteItem } from '../../data/gameData';
import { useGame } from '../../hooks/useGame';
import type { WasteType } from '../../types';
import { BinWell, WasteGlyph } from './WasteVisuals';

function shuffle<T>(list: T[]) {
  return [...list].sort(() => Math.random() - 0.5);
}

function hitBin(
  point: { x: number; y: number },
  refs: Record<string, HTMLButtonElement | null>,
) {
  return bins.find((bin) => {
    const el = refs[bin.id];
    if (!el) return false;
    const box = el.getBoundingClientRect();
    return (
      point.x >= box.left &&
      point.x <= box.right &&
      point.y >= box.top &&
      point.y <= box.bottom
    );
  })?.id;
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
  const [over, setOver] = useState<WasteType | null>(null);
  const binRefs = useRef<Record<string, HTMLButtonElement | null>>({});

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
        setOver(null);
        if (index + 1 >= queue.length) {
          setDone(true);
          setSortFocus(null);
        } else {
          setIndex((n) => n + 1);
        }
      }, 700);
    }
  };

  const onDrag = (_: unknown, info: PanInfo) => {
    const id = hitBin(info.point, binRefs.current) ?? null;
    setOver((prev) => (prev === id ? prev : id));
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const bin = hitBin(info.point, binRefs.current);
    setOver(null);
    if (bin) choose(bin);
  };

  if (done) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">
          Поляна
        </p>
        <h2 className="mt-3 font-display text-[2rem] text-forest">Всё нашло место</h2>
        <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-ink/70">
          {correct} из {queue.length} — и воздух над ростком стал чуть легче.
        </p>
        <button
          type="button"
          onClick={() => setView('world')}
          className="mt-8 rounded-full bg-forest px-5 py-3 text-sm text-paper"
        >
          Вернуться к растению
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="flex min-h-[68vh] min-w-0 flex-col overflow-x-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">
          Перетащи в контейнер
        </p>
        <div className="flex gap-1.5">
          {queue.map((item, i) => (
            <span
              key={item.id}
              className={`h-1.5 w-4 rounded-full ${
                i < index ? 'bg-leaf' : i === index ? 'bg-forest' : 'bg-[#ddd2bd]'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-6 flex flex-1 flex-col items-center justify-center">
        <motion.button
          key={current.id}
          type="button"
          drag={ok !== true}
          dragMomentum={false}
          dragElastic={0.12}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
          className="flex cursor-grab touch-none flex-col items-center"
        >
          <WasteGlyph type={current.type} className="h-24 w-20" />
          <span className="mt-3 font-display text-xl text-forest">{current.name}</span>
          <span className="mt-1 text-xs text-ink/40">тяни на контейнер или нажми на него</span>
        </motion.button>

        {message && (
          <p
            className={`absolute bottom-2 max-w-sm text-center text-sm ${
              ok ? 'text-leaf' : 'text-earth'
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {bins.map((bin) => (
          <BinWell
            key={bin.id}
            bin={bin}
            active={over === bin.id}
            onClick={() => choose(bin.id)}
            wellRef={(el) => {
              binRefs.current[bin.id] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
