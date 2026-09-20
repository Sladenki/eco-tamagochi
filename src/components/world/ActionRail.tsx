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
    <aside className="absolute left-3 top-[34%] z-20 flex w-[min(48vw,230px)] -translate-y-1/2 flex-col gap-2 sm:left-5 sm:w-56 md:top-[42%]">
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
      className="flex w-full items-center gap-3 rounded-[18px] bg-paper/95 px-3 py-2.5 text-left shadow-[0_8px_24px_rgba(30,74,54,0.12)] ring-1 ring-forest/10 backdrop-blur-sm transition hover:bg-white hover:ring-forest/25"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cream text-forest">
        {children}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold leading-tight text-forest">
          {label}
        </span>
        <span className="mt-0.5 block text-[11px] text-ink/45">{hint}</span>
      </span>
    </button>
  );
}
