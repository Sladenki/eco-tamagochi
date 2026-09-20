import { useState } from 'react';
import { bins, wasteItems } from '../../data/gameData';
import type { WasteType } from '../../types';

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
        className="absolute inset-0 bg-[#1c2b24]/25"
        aria-label="Закрыть"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-[28px] bg-paper p-5 shadow-[0_20px_60px_rgba(28,43,36,0.18)]">
        {prompt.kind === 'litter' && item && (
          <LitterPrompt
            itemName={item.name}
            hint={item.hint}
            onSort={(bin) => {
              const result = onSort(prompt.id, prompt.type, bin);
              if (result.ok) onClose();
              return result;
            }}
            onFull={onOpenFullSort}
          />
        )}
        {prompt.kind === 'debris' && (
          <>
            <Kicker>На поляне</Kicker>
            <h3 className="font-display text-2xl text-forest">Сухие ветки и обрывки</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              Это не мусор для сортировки — просто лишнее, что мешает земле дышать.
            </p>
            <SheetButton
              onClick={() => {
                onClean(prompt.id);
                onClose();
              }}
            >
              Убрать
            </SheetButton>
          </>
        )}
        {prompt.kind === 'plot' && (
          <>
            <Kicker>Пустая земля</Kicker>
            <h3 className="font-display text-2xl text-forest">Здесь может жить сосед</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              Один цветок рядом — уже биоразнообразие. Ростку будет спокойнее.
            </p>
            <SheetButton
              onClick={() => {
                onPlant();
                onClose();
              }}
            >
              Посадить
            </SheetButton>
          </>
        )}
        {prompt.kind === 'habit' && (
          <>
            <Kicker>Жест дня</Kicker>
            <h3 className="font-display text-2xl text-forest">{prompt.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{prompt.body}</p>
            <SheetButton
              onClick={() => {
                onHabit();
                onClose();
              }}
            >
              Я сделаю это сегодня
            </SheetButton>
          </>
        )}
        {prompt.kind === 'dead' && (
          <>
            <Kicker>Тишина</Kicker>
            <h3 className="font-display text-2xl text-forest">Посадить заново</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              Мир не наказывает. Он ждёт, когда ты снова будешь рядом.
            </p>
            <SheetButton
              onClick={() => {
                onRevive();
                onClose();
              }}
            >
              Посадить семечко
            </SheetButton>
          </>
        )}
      </div>
    </div>
  );
}

function LitterPrompt({
  itemName,
  hint,
  onSort,
  onFull,
}: {
  itemName: string;
  hint: string;
  onSort: (bin: WasteType) => { ok: boolean; message: string };
  onFull: () => void;
}) {
  const [message, setMessage] = useState<{ ok: boolean; message: string } | null>(null);

  return (
    <>
      <Kicker>Кто-то оставил</Kicker>
      <h3 className="font-display text-2xl text-forest">{itemName}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">Что с ней сделать?</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {bins.map((bin) => (
          <button
            key={bin.id}
            type="button"
            onClick={() => setMessage(onSort(bin.id))}
            className="rounded-2xl bg-cream px-3 py-3 text-left transition hover:bg-[#efe6d4]"
          >
            <div className="text-sm font-medium text-forest">{bin.label}</div>
            <div className="text-[11px] text-ink/50">{bin.caption}</div>
          </button>
        ))}
      </div>
      {message && (
        <p className={`mt-3 text-sm ${message.ok ? 'text-leaf' : 'text-earth'}`}>
          {message.message}
        </p>
      )}
      <p className="mt-3 text-xs leading-relaxed text-ink/45">{hint}</p>
      <button
        type="button"
        onClick={onFull}
        className="mt-4 text-sm text-forest underline decoration-moss/40 underline-offset-4"
      >
        Открыть полную сортировку
      </button>
    </>
  );
}

function Kicker({ children }: { children: string }) {
  return (
    <p className="mb-1 text-[11px] uppercase tracking-[0.22em] text-clay">{children}</p>
  );
}

function SheetButton({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 w-full rounded-full bg-forest px-5 py-3 text-sm text-paper"
    >
      {children}
    </button>
  );
}
