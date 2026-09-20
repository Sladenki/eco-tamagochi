import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CompanionBloom, LivingPlant } from '../plant/LivingPlant';
import { ActionRail } from './ActionRail';
import { ActionSheet, type WorldPrompt } from './ActionSheet';
import { AtmosphereChip } from './AtmosphereChip';
import { Landscape } from './Landscape';
import { useGame } from '../../hooks/useGame';

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
          <p className="font-display text-2xl text-forest md:text-[1.85rem]">Росток</p>
          <p className="mt-0.5 text-xs text-forest/55">твой маленький мир</p>
        </div>
        <AtmosphereChip />
      </header>

      <ActionRail
        litter={game.state.litter}
        debris={game.state.debris}
        companionPlanted={game.state.companionPlanted}
        habitDone={game.habitDoneToday}
        habitTitle={game.todayHabit.title}
        habitBody={game.todayHabit.body}
        dead={game.stage === 'dead'}
        onPrompt={setPrompt}
      />

      <div className="absolute inset-x-0 bottom-[22%] z-10 flex items-end justify-center px-4 md:bottom-[20%]">
        {game.state.companionPlanted && (
          <div className="absolute bottom-8 right-[18%] hidden sm:block md:right-[22%]">
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
      </div>

      <div className="absolute inset-x-0 bottom-[8.6rem] z-10 px-6 text-center sm:bottom-[8.4rem]">
        <p className="font-display text-[1.4rem] leading-[1.2] text-forest md:text-[1.85rem]">
          {touchLine ?? (intro ? 'Это твоё растение' : game.status.title)}
        </p>
        <p className="mx-auto mt-2 max-w-md text-[0.95rem] leading-relaxed text-ink/60">
          {intro
            ? 'Оно уже смотрит на тебя. Полей росток или выбери действие слева.'
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
            className="absolute left-1/2 top-[18%] z-20 -translate-x-1/2 rounded-full bg-paper/90 px-5 py-3 font-display text-lg text-forest shadow-lg"
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
