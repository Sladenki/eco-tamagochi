import { useGame } from '../../hooks/useGame';

export function AtmosphereChip() {
  const { atmosphere } = useGame();
  const clean = atmosphere.cleanliness;

  return (
    <div className="pointer-events-auto w-[min(58vw,240px)] overflow-hidden rounded-[22px] bg-paper/90 shadow-[0_8px_24px_rgba(30,74,54,0.1)] ring-1 ring-forest/8 backdrop-blur-md">
      <div
        className="h-10"
        style={{
          background: `linear-gradient(90deg, #c5dce8 ${clean}%, #c4b59a ${Math.min(100, clean + 28)}%)`,
        }}
      />
      <div className="px-3 py-2.5">
        <p className="font-display text-[0.92rem] leading-tight text-forest">
          {atmosphere.label}
        </p>
        <div className="relative mt-2 h-1.5 rounded-full bg-[#e6dcc8]">
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-forest shadow-sm transition-all duration-700"
            style={{ left: `calc(${clean}% - 6px)` }}
          />
        </div>
        <p className="mt-2 text-[11px] leading-snug text-ink/50">{atmosphere.whisper}</p>
      </div>
    </div>
  );
}
