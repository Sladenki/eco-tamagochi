import { useState } from 'react';

export function TopicVisual({
  kind,
}: {
  kind: 'co2' | 'climate' | 'recycle' | 'water' | 'bee' | 'habit';
}) {
  if (kind === 'co2') return <Co2Leaf />;
  if (kind === 'climate') return <ClimateHaze />;
  if (kind === 'recycle') return <RecycleLoop />;
  if (kind === 'water') return <WaterPath />;
  if (kind === 'bee') return <BeePath />;
  return <HabitSpark />;
}

function Co2Leaf() {
  const [n, setN] = useState(0);
  return (
    <button
      type="button"
      onClick={() => setN((v) => v + 1)}
      className="relative mx-auto mt-8 block h-48 w-full max-w-sm"
    >
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <path d="M170 150c-50-10-90-60-70-110 70 10 100 60 70 110Z" fill="#3f7a4c" />
        <path d="M160 148c-8-40 8-80 20-108" stroke="#1e4a36" fill="none" />
        {[0, 1, 2].map((i) => (
          <g key={`${n}-${i}`}>
            <circle
              cx={70 + i * 18}
              cy={40}
              r="14"
              fill="#c9dde8"
              className="origin-center"
              style={{
                animation: n ? `drift 1.2s ${i * 0.12}s ease forwards` : undefined,
                offsetPath: 'path("M80 40 C 110 50, 140 80, 175 110")',
              }}
            />
            <text x={62 + i * 18} y={44} fontSize="8" fill="#1e4a36">
              CO₂
            </text>
          </g>
        ))}
      </svg>
      <span className="text-xs text-ink/50">Коснись — облачка уйдут в лист</span>
    </button>
  );
}

function ClimateHaze() {
  const [thick, setThick] = useState(false);
  return (
    <button type="button" onClick={() => setThick((v) => !v)} className="mt-8 w-full">
      <div
        className="h-36 overflow-hidden rounded-[28px] transition-all duration-700"
        style={{
          background: thick
            ? 'linear-gradient(#9aa3a0, #c4b59a)'
            : 'linear-gradient(#c5dce8, #e7f1d6)',
        }}
      >
        <div className="pt-8 text-center font-display text-xl text-forest">
          {thick ? 'Одеяло стало плотнее' : 'Небо ещё лёгкое'}
        </div>
      </div>
      <p className="mt-2 text-xs text-ink/50">Нажми, чтобы увидеть разницу</p>
    </button>
  );
}

function RecycleLoop() {
  return (
    <div className="mt-8 flex justify-center gap-3 text-center text-xs text-forest">
      {['собрать', 'разобрать', 'снова вещь'].map((label) => (
        <div key={label} className="rounded-full bg-cream px-4 py-6">
          {label}
        </div>
      ))}
    </div>
  );
}

function WaterPath() {
  return (
    <svg viewBox="0 0 280 140" className="mx-auto mt-8 h-32 w-full max-w-sm">
      <path d="M40 120c20-50 40-50 40-90" stroke="#3f6f8a" strokeWidth="3" fill="none" />
      <circle cx="80" cy="28" r="8" fill="#7eb3c9" className="leaf-pulse" />
      <path d="M140 30c0 40 20 50 80 70" stroke="#3f6f8a" strokeWidth="2" fill="none" opacity="0.5" />
    </svg>
  );
}

function BeePath() {
  return (
    <svg viewBox="0 0 280 120" className="mx-auto mt-8 h-28 w-full max-w-sm">
      <circle cx="60" cy="70" r="16" fill="#f4e4b8" />
      <circle cx="160" cy="44" r="16" fill="#f4e4b8" />
      <circle cx="230" cy="78" r="16" fill="#f4e4b8" />
      <g className="cloud-drift">
        <ellipse cx="90" cy="50" rx="10" ry="6" fill="#e6c35c" />
        <ellipse cx="82" cy="50" rx="4" ry="7" fill="#fbf7f0" opacity="0.8" />
      </g>
    </svg>
  );
}

function HabitSpark() {
  return (
    <div className="mt-8 font-display text-2xl leading-snug text-forest">
      жест
      <span className="mx-2 text-clay">→</span>
      повтор
      <span className="mx-2 text-clay">→</span>
      привычка
    </div>
  );
}
