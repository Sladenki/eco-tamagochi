import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { wasteItems } from '../../data/gameData';
import { CompanionBloom, LivingPlant } from '../plant/LivingPlant';
import { ActionSheet, type WorldPrompt } from './ActionSheet';
import { Landscape } from './Landscape';
import { useGame } from '../../hooks/useGame';
import type { WasteType } from '../../types';

export function WorldScene() {
  const game = useGame();
  const [prompt, setPrompt] = useState<WorldPrompt | null>(null);
  const [touchLine, setTouchLine] = useState<string | null>(null);
  const [intro, setIntro] = useState(true);
  const dull = game.stage === 'dead' || game.stage === 'wilting';

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Landscape sky={game.sky} dull={dull} />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <div>
          <p className="font-display text-2xl text-forest md:text-3xl">Росток</p>
          <p className="text-[11px] tracking-wide text-forest/55">твой маленький мир</p>
        </div>
        <AtmosphereChip />
      </header>

      {!game.habitDoneToday && (
        <button
          type="button"
          onClick={() =>
            setPrompt({
              kind: 'habit',
              title: game.todayHabit.title,
              body: game.todayHabit.body,
            })
          }
          className="leaf-pulse absolute right-[18%] top-[28%] z-10 grid h-11 w-11 place-items-center rounded-full bg-[#f4e4b8] text-lg shadow-md md:right-[22%] md:top-[24%]"
          aria-label="Жест дня"
        >
          ✦
        </button>
      )}

      <div className="absolute inset-x-0 bottom-[22%] z-10 flex items-end justify-center gap-6 px-4 md:bottom-[20%]">
        {game.state.companionPlanted && (
          <div className="mb-4 hidden sm:block">
            <CompanionBloom />
          </div>
        )}
        <LivingPlant
          stage={game.stage}
          watering={game.watering}
          onTouch={() => {
            if (game.stage === 'dead') {
              setPrompt({ kind: 'dead' });
              return;
            }
            const line = game.touchPlant();
            setTouchLine(line);
            window.setTimeout(() => setTouchLine(null), 2200);
          }}
        />
        <div className="mb-6 w-16 sm:w-20">
          {game.state.companionPlanted ? (
            <div className="sm:hidden">
              <CompanionBloom />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPrompt({ kind: 'plot' })}
              className="leaf-pulse flex h-16 w-16 flex-col items-center justify-end rounded-full"
              aria-label="Пустая земля"
            >
              <span className="mb-1 h-3 w-10 rounded-full bg-[#6b4428]/70" />
              <span className="text-[10px] text-earth">посадить</span>
            </button>
          )}
        </div>
      </div>

      {game.state.litter.map((item) => (
        <WorldThing
          key={item.id}
          x={item.x}
          y={item.y}
          pulse
          label={labelForWaste(item.type)}
          onClick={() => setPrompt({ kind: 'litter', id: item.id, type: item.type })}
        >
          <WasteGlyph type={item.type} />
        </WorldThing>
      ))}

      {game.state.debris.map((item) => (
        <WorldThing
          key={item.id}
          x={item.x}
          y={item.y}
          pulse
          label="убрать"
          onClick={() => setPrompt({ kind: 'debris', id: item.id })}
        >
          <svg viewBox="0 0 40 24" className="h-6 w-10">
            <path d="M4 16l10-8 8 4 10-6" stroke="#6b5344" strokeWidth="2" fill="none" />
            <circle cx="30" cy="18" r="3" fill="#8a7350" />
          </svg>
        </WorldThing>
      ))}

      <div className="absolute inset-x-0 bottom-[8.6rem] z-10 px-6 text-center sm:bottom-[8.4rem]">
        <p className="font-display text-[1.55rem] leading-tight text-forest md:text-3xl">
          {touchLine ?? (intro ? 'Это твоё растение' : game.status.title)}
        </p>
        <p className="mx-auto mt-1 max-w-md text-sm text-ink/65 md:text-base">
          {intro
            ? 'Оно уже смотрит на тебя. Коснись ростка или того, что лежит на земле.'
            : game.status.detail}
        </p>
      </div>

      <AnimatePresence>
        {game.welcome && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onClick={game.dismissWelcome}
            className="absolute left-1/2 top-[18%] z-20 -translate-x-1/2 rounded-full bg-paper/90 px-5 py-3 font-display text-xl text-forest shadow-lg"
          >
            {game.welcome}
          </motion.button>
        )}
      </AnimatePresence>

      {game.feedback && (
        <div className="pointer-events-none absolute left-1/2 top-[38%] z-20 -translate-x-1/2 rounded-full bg-forest px-4 py-2 text-sm text-paper shadow-lg">
          {game.feedback.text}
        </div>
      )}

      {prompt && (
        <ActionSheet
          prompt={prompt}
          onClose={() => setPrompt(null)}
          onSort={game.pickLitter}
          onClean={game.cleanDebris}
          onPlant={game.plantCompanion}
          onHabit={game.completeHabit}
          onRevive={game.revive}
          onOpenFullSort={() => {
            setPrompt(null);
            if (prompt.kind === 'litter') game.setSortFocus(prompt.type);
            game.setView('games');
          }}
        />
      )}
    </div>
  );
}

function AtmosphereChip() {
  const { atmosphere } = useGame();
  return (
    <div className="pointer-events-auto max-w-[58%] rounded-[22px] bg-paper/80 px-3 py-2 text-right shadow-sm backdrop-blur-sm">
      <p className="text-[11px] uppercase tracking-[0.16em] text-clay">Состояние атмосферы</p>
      <p className="font-display text-base leading-tight text-forest">{atmosphere.label}</p>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#e6dcc8]">
        <div
          className="h-full rounded-full bg-leaf transition-all duration-700"
          style={{ width: `${atmosphere.cleanliness}%` }}
        />
      </div>
      <p className="mt-1 text-[11px] text-ink/50">{atmosphere.whisper}</p>
    </div>
  );
}

function WorldThing({
  x,
  y,
  pulse,
  label,
  onClick,
  children,
}: {
  x: number;
  y: number;
  pulse?: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${pulse ? 'leaf-pulse' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {children}
      <span className="mt-1 block text-[10px] text-forest/80">{label}</span>
    </button>
  );
}

function WasteGlyph({ type }: { type: WasteType }) {
  if (type === 'plastic') {
    return (
      <svg viewBox="0 0 28 44" className="h-10 w-7">
        <path d="M10 8h8l2 4v24a6 6 0 0 1-12 0V12l2-4Z" fill="#7eb3c9" />
        <rect x="11" y="4" width="6" height="6" rx="1" fill="#4f7f90" />
      </svg>
    );
  }
  if (type === 'paper') {
    return (
      <svg viewBox="0 0 36 28" className="h-7 w-9">
        <path d="M4 6c8 6 12-4 20 2 4 3-2 16-10 14C6 20 0 12 4 6Z" fill="#f2e6c9" stroke="#c9b07d" />
      </svg>
    );
  }
  if (type === 'glass') {
    return (
      <svg viewBox="0 0 24 40" className="h-10 w-6">
        <path d="M8 6h8l1 6-3 22a5 5 0 0 1-10 0L7 12l1-6Z" fill="#8fc7b5" opacity="0.9" />
      </svg>
    );
  }
  if (type === 'metal') {
    return (
      <svg viewBox="0 0 32 28" className="h-7 w-8">
        <rect x="4" y="8" width="24" height="16" rx="4" fill="#b7b7b0" />
        <rect x="8" y="4" width="16" height="6" rx="2" fill="#9a9a93" />
      </svg>
    );
  }
  if (type === 'battery') {
    return (
      <svg viewBox="0 0 20 32" className="h-9 w-6">
        <rect x="4" y="6" width="12" height="22" rx="2" fill="#3d3d3a" />
        <rect x="7" y="3" width="6" height="4" rx="1" fill="#c9c9c2" />
        <rect x="6" y="10" width="8" height="6" fill="#e6c35c" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 24" className="h-6 w-7">
      <path d="M6 16c4-10 14-10 16 0-6 6-14 6-16 0Z" fill="#c4844a" />
    </svg>
  );
}

function labelForWaste(type: WasteType) {
  return wasteItems.find((item) => item.type === type)?.name.split(' ')[0] ?? 'мусор';
}
