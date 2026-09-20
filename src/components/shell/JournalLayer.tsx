import type { ReactNode } from 'react';
import { LivingPlant } from '../plant/LivingPlant';
import { useGame } from '../../hooks/useGame';

export function JournalLayer({ children }: { children: ReactNode }) {
  const { stage, watering, setView } = useGame();

  return (
    <div className="absolute inset-0 z-20 overflow-y-auto bg-[#f4eee3]/93 backdrop-blur-[12px]">
      <div className="mx-auto min-h-full max-w-3xl px-5 pb-32 pt-[max(1.1rem,env(safe-area-inset-top))]">
        {children}
      </div>
      <button
        type="button"
        onClick={() => setView('world')}
        className="fixed bottom-[5.6rem] right-4 z-30 hidden rounded-[24px] bg-paper/90 p-2 shadow-md ring-1 ring-forest/10 sm:block"
        aria-label="К растению"
      >
        <LivingPlant stage={stage} watering={watering} compact interactive={false} />
      </button>
    </div>
  );
}
