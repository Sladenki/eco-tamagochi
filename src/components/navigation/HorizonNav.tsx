import { memo, useLayoutEffect, useRef, useState } from 'react';
import { Award, BookOpen, Recycle, Sprout, Users } from 'lucide-react';
import type { View } from '../../types';
import { pathFromView } from '../../utils/routes';

const items: { id: View; label: string; short: string; Icon: typeof Sprout }[] = [
  { id: 'world', label: 'Мой мир', short: 'Мир', Icon: Sprout },
  { id: 'encyclopedia', label: 'Энциклопедия', short: 'Знания', Icon: BookOpen },
  { id: 'games', label: 'Игры', short: 'Игры', Icon: Recycle },
  { id: 'achievements', label: 'Достижения', short: 'Следы', Icon: Award },
  { id: 'team', label: 'Команда', short: 'Команда', Icon: Users },
];

export const HorizonNav = memo(function HorizonNav({
  view,
  onChange,
}: {
  view: View;
  onChange: (view: View) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [pill, setPill] = useState({ x: 0, y: 0, ready: false });

  useLayoutEffect(() => {
    const place = () => {
      const rail = railRef.current;
      const icon = iconRefs.current[items.findIndex((item) => item.id === view)];
      if (!rail || !icon) return;
      const railBox = rail.getBoundingClientRect();
      const iconBox = icon.getBoundingClientRect();
      setPill({
        x: iconBox.left - railBox.left - rail.clientLeft,
        y: iconBox.top - railBox.top - rail.clientTop,
        ready: true,
      });
    };

    place();
    const rail = railRef.current;
    if (!rail) return undefined;
    const observer = new ResizeObserver(place);
    observer.observe(rail);
    iconRefs.current.forEach((icon) => {
      if (icon) observer.observe(icon);
    });
    window.addEventListener('resize', place);
    void document.fonts?.ready.then(place);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', place);
    };
  }, [view]);

  return (
    <nav
      className="pointer-events-auto fixed inset-x-0 bottom-0 z-30 flex justify-center px-2 pb-[max(0.55rem,env(safe-area-inset-bottom))] sm:px-3 sm:pb-[max(0.7rem,env(safe-area-inset-bottom))]"
      aria-label="Разделы"
    >
      <div
        ref={railRef}
        className="relative flex w-full max-w-lg items-end justify-between rounded-[28px] bg-[#fbf7f0] px-1 py-1.5 shadow-md ring-1 ring-[#1e4a36]/8 sm:w-auto sm:gap-1 sm:px-2 sm:py-2 sm:shadow-[0_12px_40px_rgba(30,74,54,0.14)]"
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute top-0 left-0 h-9 w-9 rounded-full bg-forest ${
            pill.ready
              ? 'opacity-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
              : 'opacity-0'
          }`}
          style={{ transform: `translate3d(${pill.x}px, ${pill.y}px, 0)` }}
        />
        {items.map(({ id, label, short, Icon }, i) => {
          const active = view === id;
          return (
            <a
              key={id}
              href={pathFromView(id)}
              aria-current={active ? 'page' : undefined}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey ||
                  event.button !== 0
                ) {
                  return;
                }
                event.preventDefault();
                onChange(id);
              }}
              className={`relative z-10 flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl px-1.5 py-1.5 text-[9px] no-underline sm:flex-none sm:px-3 sm:py-2 sm:text-[11px] ${
                active ? 'text-forest' : 'text-ink/45'
              }`}
            >
              <span
                ref={(node) => {
                  iconRefs.current[i] = node;
                }}
                className={`grid h-9 w-9 place-items-center rounded-full ${
                  active ? 'text-paper' : 'text-current'
                }`}
              >
                <Icon size={18} strokeWidth={1.7} />
              </span>
              <span className="max-w-full truncate font-medium sm:hidden">{short}</span>
              <span className="hidden max-w-full truncate font-medium sm:inline">{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
});
