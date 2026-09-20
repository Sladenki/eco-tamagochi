import { useState } from 'react';
import { SortingGame } from './SortingGame';
import { ecoActions } from '../../data/ecoActions';
import { useGame } from '../../hooks/useGame';

export function GamesClearing() {
  const { setView, todayHabit, habitDoneToday, completeHabit, sortFocus } = useGame();
  const [play, setPlay] = useState(() => Boolean(sortFocus));

  if (play) return <SortingGame />;

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-clay">Игры поляны</p>
      <h2 className="font-display text-4xl text-forest md:text-5xl">Сначала жест, потом правило.</h2>
      <p className="mt-3 max-w-lg text-ink/65">
        Это не уровни. Это способы помочь ростку руками, а не только глазами.
      </p>
      <p className="mt-4 text-sm text-ink/45">{ecoActions.find((a) => a.id === 'sort')?.prompt}</p>

      <button
        type="button"
        onClick={() => setPlay(true)}
        className="mt-6 block w-full rounded-[28px] bg-cream px-5 py-6 text-left"
      >
        <p className="text-xs uppercase tracking-[0.16em] text-clay">мини-игра</p>
        <p className="mt-1 font-display text-3xl text-forest">Сортировка</p>
        <p className="mt-2 text-sm text-ink/60">
          Шесть вещей. Шесть мест. Ошибка — это объяснение, не штраф.
        </p>
      </button>

      <div className="mt-4 rounded-[28px] px-5 py-6 ring-1 ring-forest/10">
        <p className="text-xs uppercase tracking-[0.16em] text-clay">задание дня</p>
        <p className="mt-1 font-display text-2xl text-forest">{todayHabit.title}</p>
        <p className="mt-2 text-sm text-ink/60">{todayHabit.body}</p>
        {habitDoneToday ? (
          <p className="mt-4 text-sm text-leaf">Сегодня уже принято.</p>
        ) : (
          <button
            type="button"
            onClick={() => {
              completeHabit();
              setView('world');
            }}
            className="mt-5 rounded-full bg-forest px-5 py-3 text-sm text-paper"
          >
            Я сделаю это сегодня
          </button>
        )}
      </div>
    </div>
  );
}
