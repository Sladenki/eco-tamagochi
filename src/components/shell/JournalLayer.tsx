import type { ReactNode } from 'react';
import { LivingPlant } from '../plant/LivingPlant';
import { useGame } from '../../hooks/useGame';

export function JournalLayer({ children }: { children: ReactNode }) {
  const { stage, setView } = useGame();

  return (
    <div className="absolute inset-0 z-20 overflow-x-hidden overflow-y-auto overscroll-contain bg-[#f4eee3]">
      <div className="mx-auto min-h-full min-w-0 max-w-3xl px-4 pb-32 pt-[max(1.1rem,env(safe-area-inset-top))] sm:px-5">
        {children}
      </div>
      <button
        type="button"
        onClick={() => setView('world')}
        className="fixed bottom-[5.6rem] right-4 z-30 hidden rounded-[24px] bg-paper p-2 shadow-md ring-1 ring-forest/10 sm:block"
        aria-label="К растению"
      >
          <LivingPlant stage={stage} watering={false} compact interactive={false} />
      </button>
    </div>
  );
}
