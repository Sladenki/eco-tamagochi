import { useState } from 'react';
import { bins, wasteItems } from '../../data/gameData';
import type { WasteType } from '../../types';
import { BinWell, WasteGlyph } from '../games/WasteVisuals';

export type WorldPrompt =
  | { kind: 'litter'; id: string; type: WasteType }
  | { kind: 'debris'; id: string }
  | { kind: 'plot' }
  | { kind: 'habit'; title: string; body: string }
  | { kind: 'dead' };

export function ActionSheet({
  prompt,
  onClose,
  onSort,
  onClean,
  onPlant,
  onHabit,
  onRevive,
  onOpenFullSort,
}: {
  prompt: WorldPrompt;
  onClose: () => void;
  onSort: (id: string, type: WasteType, bin: WasteType) => { ok: boolean; message: string };
  onClean: (id: string) => void;
  onPlant: () => void;
  onHabit: () => void;
  onRevive: () => void;
  onOpenFullSort: () => void;
}) {
  const item = prompt.kind === 'litter' ? wasteItems.find((w) => w.type === prompt.type) : null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center p-3 pb-[5.5rem] sm:items-center sm:pb-3">
      <button
        type="button"
        className="absolute inset-0 bg-[#1c2b24]/35 backdrop-blur-[2px]"
        aria-label="Закрыть"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-paper shadow-[0_24px_70px_rgba(28,43,36,0.22)]">
        {prompt.kind === 'litter' && item && (
          <LitterPrompt
            type={prompt.type}
            itemName={item.name}
            onSort={(bin) => {
              const result = onSort(prompt.id, prompt.type, bin);
              if (result.ok) onClose();
              return result;
            }}
            onFull={onOpenFullSort}
          />
        )}
        {prompt.kind === 'debris' && (
          <SimplePrompt
            kicker="На поляне"
            title="Сухие ветки и обрывки"
            body="Это не сортировка. Просто лишнее, что мешает земле дышать."
            action="Убрать"
            onAction={() => {
              onClean(prompt.id);
              onClose();
            }}
          />
        )}
        {prompt.kind === 'plot' && (
          <SimplePrompt
            kicker="Пустая земля"
            title="Здесь может жить сосед"
            body="Один цветок рядом — уже больше мира. Ростку будет спокойнее."
            action="Посадить"
            onAction={() => {
              onPlant();
              onClose();
            }}
          />
        )}
        {prompt.kind === 'habit' && (
          <SimplePrompt
            kicker="Жест дня"
            title={prompt.title}
            body={prompt.body}
            action="Я сделаю это сегодня"
            onAction={() => {
              onHabit();
              onClose();
            }}
          />
        )}
        {prompt.kind === 'dead' && (
          <SimplePrompt
            kicker="Тишина"
            title="Посадить заново"
            body="Мир не наказывает. Он ждёт, когда ты снова будешь рядом."
            action="Посадить семечко"
            onAction={() => {
              onRevive();
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}

function LitterPrompt({
  type,
  itemName,
  onSort,
  onFull,
}: {
  type: WasteType;
  itemName: string;
  onSort: (bin: WasteType) => { ok: boolean; message: string };
  onFull: () => void;
}) {
  const [message, setMessage] = useState<{ ok: boolean; message: string } | null>(null);

  return (
    <div className="p-5">
      <div className="flex items-center gap-4 rounded-[24px] bg-cream px-4 py-4">
        <WasteGlyph type={type} className="h-14 w-10 shrink-0" />
        <div>
          <p className="text-[11px] font-semibold text-clay">Кто-то оставил</p>
          <h3 className="mt-1 font-display text-[1.35rem] text-forest">{itemName}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm text-ink/60">Положи в свой контейнер</p>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {bins.map((bin) => (
          <BinWell
            key={bin.id}
            bin={bin}
            onClick={() => setMessage(onSort(bin.id))}
          />
        ))}
      </div>
      {message && (
        <p className={`mt-4 text-sm ${message.ok ? 'text-leaf' : 'text-earth'}`}>
          {message.message}
        </p>
      )}
      <button
        type="button"
        onClick={onFull}
        className="mt-4 text-sm font-medium text-forest"
      >
        Открыть полную сортировку →
      </button>
    </div>
  );
}

function SimplePrompt({
  kicker,
  title,
  body,
  action,
  onAction,
}: {
  kicker: string;
  title: string;
  body: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="p-6">
      <p className="text-[11px] font-semibold text-clay">{kicker}</p>
      <h3 className="mt-2 font-display text-[1.55rem] text-forest">{title}</h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">{body}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-6 w-full rounded-full bg-forest px-5 py-3.5 text-sm font-medium text-paper"
      >
        {action}
      </button>
    </div>
  );
}
