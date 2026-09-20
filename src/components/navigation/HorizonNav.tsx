import { Award, BookOpen, Recycle, Sprout, Users } from 'lucide-react';
import type { View } from '../../types';

const items: { id: View; label: string; Icon: typeof Sprout }[] = [
  { id: 'world', label: 'Мой мир', Icon: Sprout },
  { id: 'encyclopedia', label: 'Энциклопедия', Icon: BookOpen },
  { id: 'games', label: 'Игры', Icon: Recycle },
  { id: 'achievements', label: 'Достижения', Icon: Award },
  { id: 'team', label: 'Команда', Icon: Users },
];

export function HorizonNav({
  view,
  onChange,
}: {
  view: View;
  onChange: (view: View) => void;
}) {
  return (
    <nav
      className="pointer-events-auto fixed inset-x-0 bottom-0 z-30 flex justify-center px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))]"
      aria-label="Разделы"
    >
      <div className="flex w-full max-w-lg items-end justify-between gap-1 rounded-[28px] bg-[#fbf7f0]/92 px-2 py-2 shadow-[0_12px_40px_rgba(30,74,54,0.14)] ring-1 ring-[#1e4a36]/8 backdrop-blur-md sm:w-auto sm:gap-2 sm:px-3">
        {items.map(({ id, label, Icon }) => {
          const active = view === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] sm:flex-none sm:px-3 sm:text-[11px] ${
                active ? 'text-forest' : 'text-ink/45'
              }`}
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-full ${
                  active ? 'bg-forest text-paper' : 'bg-transparent'
                }`}
              >
                <Icon size={18} strokeWidth={1.7} />
              </span>
              <span className="truncate font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
