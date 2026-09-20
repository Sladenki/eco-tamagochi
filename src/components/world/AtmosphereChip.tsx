import { useGame } from '../../hooks/useGame';

export function AtmosphereChip() {
  const { atmosphere } = useGame();
  const clean = atmosphere.cleanliness;

  return (
    <div className="pointer-events-auto w-[min(46vw,148px)] overflow-hidden rounded-2xl bg-paper shadow-sm ring-1 ring-forest/8 sm:w-[min(58vw,240px)] sm:rounded-[22px] sm:shadow-[0_8px_24px_rgba(30,74,54,0.1)]">
      <div
        className="hidden h-10 sm:block"
        style={{
          background: `linear-gradient(90deg, #c5dce8 ${clean}%, #c4b59a ${Math.min(100, clean + 28)}%)`,
        }}
      />
      <div className="px-2 py-1.5 sm:px-3 sm:py-2.5">
        <p className="font-display text-[11px] leading-tight text-forest sm:text-[0.92rem]">
          {atmosphere.label}
        </p>
        <div className="relative mt-1.5 h-1 rounded-full bg-[#e6dcc8] sm:mt-2 sm:h-1.5">
          <div
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-forest shadow-sm transition-all duration-700 sm:h-3 sm:w-3"
            style={{ left: `calc(${clean}% - 5px)` }}
          />
        </div>
        <p className="mt-2 hidden text-[11px] leading-snug text-ink/50 sm:block">
          {atmosphere.whisper}
        </p>
      </div>
    </div>
  );
}
