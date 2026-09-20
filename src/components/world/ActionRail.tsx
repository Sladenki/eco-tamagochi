import type { ReactNode } from 'react';
import { Recycle, Sparkles, Sprout, Trash2 } from 'lucide-react';
import { wasteItems } from '../../data/gameData';
import type { WorldLitter } from '../../types';
import type { WorldPrompt } from './ActionSheet';

type Props = {
  litter: WorldLitter[];
  debris: { id: string }[];
  companionPlanted: boolean;
  habitDone: boolean;
  habitTitle: string;
  habitBody: string;
  dead: boolean;
  onPrompt: (prompt: WorldPrompt) => void;
};

export function ActionRail({
  litter,
  debris,
  companionPlanted,
  habitDone,
  habitTitle,
  habitBody,
  dead,
  onPrompt,
}: Props) {
  return (
    <aside className="absolute left-2 top-[6.6rem] z-20 flex w-auto flex-col gap-1.5 sm:left-5 sm:top-[34%] sm:w-56 sm:-translate-y-1/2 sm:gap-2 md:top-[42%]">
      {dead && (
        <RailButton
          label="Посадить заново"
          hint="земля помнит"
          onClick={() => onPrompt({ kind: 'dead' })}
        >
          <Sprout size={18} strokeWidth={1.8} />
        </RailButton>
      )}

      {litter.map((item) => {
        const name = wasteItems.find((w) => w.type === item.type)?.name ?? 'Мусор';
        return (
          <RailButton
            key={item.id}
            label={name}
            hint="сортировать"
            onClick={() => onPrompt({ kind: 'litter', id: item.id, type: item.type })}
          >
            <Recycle size={18} strokeWidth={1.8} />
          </RailButton>
        );
      })}

      {debris.map((item) => (
        <RailButton
          key={item.id}
          label="Убрать поляну"
          hint="ветки и обрывки"
          onClick={() => onPrompt({ kind: 'debris', id: item.id })}
        >
          <Trash2 size={18} strokeWidth={1.8} />
        </RailButton>
      ))}

      {!companionPlanted && !dead && (
        <RailButton
          label="Посадить соседа"
          hint="пустая земля"
          onClick={() => onPrompt({ kind: 'plot' })}
        >
          <Sprout size={18} strokeWidth={1.8} />
        </RailButton>
      )}

      {!habitDone && (
        <RailButton
          label="Жест дня"
          hint="маленькое обещание"
          onClick={() => onPrompt({ kind: 'habit', title: habitTitle, body: habitBody })}
        >
          <Sparkles size={18} strokeWidth={1.8} />
        </RailButton>
      )}
    </aside>
  );
}

function RailButton({
  label,
  hint,
  onClick,
  children,
}: {
  label: string;
  hint: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}. ${hint}`}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/95 text-forest shadow-[0_8px_24px_rgba(30,74,54,0.12)] ring-1 ring-forest/10 backdrop-blur-sm transition hover:bg-white hover:ring-forest/25 sm:h-auto sm:w-full sm:justify-start sm:gap-3 sm:rounded-[18px] sm:px-3 sm:py-2.5 sm:text-left"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center sm:h-10 sm:w-10 sm:rounded-2xl sm:bg-cream">
        {children}
      </span>
      <span className="hidden min-w-0 sm:block">
        <span className="block truncate text-[13px] font-semibold leading-tight text-forest">
          {label}
        </span>
        <span className="mt-0.5 block text-[11px] text-ink/45">{hint}</span>
      </span>
    </button>
  );
}
