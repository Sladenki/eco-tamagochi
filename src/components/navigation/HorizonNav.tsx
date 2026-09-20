import { motion } from 'framer-motion';
import { Award, BookOpen, Recycle, Sprout, Users } from 'lucide-react';
import type { View } from '../../types';

const items: { id: View; label: string; short: string; Icon: typeof Sprout }[] = [
  { id: 'world', label: 'Мой мир', short: 'Мир', Icon: Sprout },
  { id: 'encyclopedia', label: 'Энциклопедия', short: 'Знания', Icon: BookOpen },
  { id: 'games', label: 'Игры', short: 'Игры', Icon: Recycle },
  { id: 'achievements', label: 'Достижения', short: 'Следы', Icon: Award },
  { id: 'team', label: 'Команда', short: 'Команда', Icon: Users },
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
      className="pointer-events-auto fixed inset-x-0 bottom-0 z-30 flex justify-center px-2 pb-[max(0.55rem,env(safe-area-inset-bottom))] sm:px-3 sm:pb-[max(0.7rem,env(safe-area-inset-bottom))]"
      aria-label="Разделы"
    >
      <div className="flex w-full max-w-lg items-end justify-between rounded-[28px] bg-[#fbf7f0]/92 px-1 py-1.5 shadow-[0_12px_40px_rgba(30,74,54,0.14)] ring-1 ring-[#1e4a36]/8 backdrop-blur-md sm:w-auto sm:gap-1 sm:px-2 sm:py-2">
        {items.map(({ id, label, short, Icon }) => {
          const active = view === id;
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 520, damping: 28 }}
              className={`relative flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl px-1.5 py-1.5 text-[9px] sm:flex-none sm:px-3 sm:py-2 sm:text-[11px] ${
                active ? 'text-forest' : 'text-ink/45'
              }`}
            >
              <span className="relative grid h-9 w-9 place-items-center">
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-forest"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <Icon
                  size={18}
                  strokeWidth={1.7}
                  className={`relative z-10 ${active ? 'text-paper' : ''}`}
                />
              </span>
              <span className="max-w-full truncate font-medium sm:hidden">{short}</span>
              <span className="hidden max-w-full truncate font-medium sm:inline">{label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
