import { memo } from 'react';
import type { PlantStage } from '../../types';

type Props = {
  stage: PlantStage;
  watering: boolean;
  compact?: boolean;
  interactive?: boolean;
  onTouch?: () => void;
};

export const LivingPlant = memo(function LivingPlant({
  stage,
  watering,
  compact,
  interactive = true,
  onTouch,
}: Props) {
  const thirsty = stage === 'wilting' || stage === 'seed';
  const still = stage === 'dead';
  const Tag = interactive ? 'button' : 'div';

  return (
    <Tag
      {...(interactive
        ? { type: 'button' as const, onClick: onTouch }
        : {})}
      className={`relative border-0 bg-transparent p-0 ${
        interactive ? 'cursor-pointer active:scale-[0.97]' : ''
      } ${compact ? 'h-24 w-20' : 'h-[min(46vh,380px)] w-[min(78vw,320px)] sm:h-[min(58vh,420px)] sm:w-[min(72vw,340px)]'}`}
      aria-label={interactive ? 'Твоё растение' : undefined}
    >
      <span
        className={`block h-full w-full ${
          still ? '' : thirsty ? 'plant-sway is-thirsty' : 'plant-sway'
        }`}
      >
      <svg
        viewBox="0 0 200 280"
        className="h-full w-full"
      >
        <ellipse
          cx="100"
          cy="252"
          rx={compact ? 28 : 48}
          ry="10"
          fill="#5c3a24"
          opacity="0.35"
        />
        <path
          d="M52 248c18-18 48-22 96 0 4 8-8 16-48 16s-52-8-48-16Z"
          fill="#6b4428"
        />
        <path
          d="M70 250c10-10 30-14 62 0-14 8-46 8-62 0Z"
          fill="#8a5a34"
        />

        {stage === 'seed' && <Seed />}
        {stage === 'sprout' && <Sprout wilt={false} />}
        {stage === 'young' && <Young wilt={false} />}
        {stage === 'healthy' && <Healthy wilt={false} bloom={false} />}
        {stage === 'blooming' && <Healthy wilt={false} bloom />}
        {stage === 'wilting' && <Healthy wilt bloom={false} />}
        {stage === 'dead' && <Dead />}
      </svg>
      </span>

      {watering && <Rain />}
      {!compact && !still && interactive && (
        <span className="pointer-events-none absolute inset-x-0 -bottom-1 text-center text-[11px] tracking-wide text-forest/55">
          коснись
        </span>
      )}
    </Tag>
  );
});

function Seed() {
  return (
    <g>
      <ellipse cx="100" cy="238" rx="11" ry="8" fill="#6b4428" />
      <ellipse cx="98" cy="236" rx="4" ry="2.4" fill="#c9a27a" opacity="0.7" />
    </g>
  );
}

function Sprout({ wilt }: { wilt: boolean }) {
  return (
    <g>
      <path
        d="M100 246c0-38 0-62 2-78"
        fill="none"
        stroke={wilt ? '#7a6a3a' : '#2f6b40'}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M102 188c-18-4-28-18-26-32 16 4 24 16 26 32Z"
        fill={wilt ? '#8a7a48' : '#5fa35f'}
      />
      <path
        d="M102 196c16-6 28-16 30-30-18 2-26 14-30 30Z"
        fill={wilt ? '#9a8a52' : '#7fbf6e'}
      />
    </g>
  );
}

function Young({ wilt }: { wilt: boolean }) {
  const stem = wilt ? '#6d5c32' : '#2c5d38';
  const leafA = wilt ? '#8b7a42' : '#3f8a4c';
  const leafB = wilt ? '#9a8a50' : '#6fb35f';
  return (
    <g>
      <path
        d="M100 246c-2-50 2-90 1-128"
        fill="none"
        stroke={stem}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M99 200c-28-8-40-28-36-48 24 6 34 24 36 48Z" fill={leafA} />
      <path d="M102 186c26-10 42-26 40-48-26 4-36 22-40 48Z" fill={leafB} />
      <path d="M98 160c-22-14-24-36-12-52 18 12 20 32 12 52Z" fill={leafB} />
      <path d="M103 148c20-12 28-32 18-50-18 10-22 30-18 50Z" fill={leafA} />
    </g>
  );
}

function Healthy({ wilt, bloom }: { wilt: boolean; bloom: boolean }) {
  const stem = wilt ? '#6a5a30' : '#245434';
  const a = wilt ? '#7d6d3c' : '#2f7040';
  const b = wilt ? '#90804a' : '#5aa85a';
  const c = wilt ? '#a09058' : '#86c56f';
  const droop = wilt ? 12 : 0;
  return (
    <g transform={`translate(0 ${droop})`}>
      <path
        d="M100 248c-3-70 4-130 1-168"
        fill="none"
        stroke={stem}
        strokeWidth="4.4"
        strokeLinecap="round"
      />
      <path d="M98 220c-34-6-52-30-46-58 30 8 44 30 46 58Z" fill={a} />
      <path d="M103 210c32-10 54-30 50-58-30 6-44 28-50 58Z" fill={b} />
      <path d="M96 176c-30-16-36-44-18-68 24 16 28 42 18 68Z" fill={b} />
      <path d="M105 168c28-14 40-40 24-66-24 14-28 40-24 66Z" fill={c} />
      <path d="M97 138c-22-18-20-46-4-64 18 16 18 42 4 64Z" fill={c} />
      <path d="M104 128c22-16 26-42 10-62-18 14-20 40-10 62Z" fill={a} />
      <path d="M100 108c-10-22-4-40 8-52 2 22-2 40-8 52Z" fill={b} />
      {bloom && (
        <g>
          <Flower x={78} y={92} />
          <Flower x={118} y={84} />
          <Flower x={98} y={70} />
        </g>
      )}
    </g>
  );
}

function Flower({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy="-8"
          rx="4.2"
          ry="7.5"
          fill="#f4e4b8"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle r="4.2" fill="#e07a3d" />
    </g>
  );
}

function Dead() {
  return (
    <g>
      <path
        d="M100 248c2-40-6-80-2-110"
        fill="none"
        stroke="#6b5344"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M98 168c-14 10-18 22-8 28 2-12 6-22 8-28Z"
        fill="#8a7350"
        opacity="0.8"
      />
      <ellipse cx="124" cy="238" rx="10" ry="4" fill="#8a7350" opacity="0.7" />
    </g>
  );
}

function Rain() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {[28, 52, 74].map((left, i) => (
        <span
          key={left}
          className="rain-drop absolute top-4 h-5 w-1 rounded-full bg-[#7eb3c9]"
          style={{ left: `${left}%`, animationDelay: `${i * 0.08}s` }}
        />
      ))}
    </div>
  );
}

export function CompanionBloom() {
  return (
    <svg viewBox="0 0 80 110" className="h-24 w-16">
      <ellipse cx="40" cy="100" rx="16" ry="5" fill="#5c3a24" opacity="0.3" />
      <path d="M40 100c0-40 0-58 0-70" stroke="#2f6b40" strokeWidth="2.4" fill="none" />
      <path d="M40 78c-12-2-18-12-16-22 10 2 14 10 16 22Z" fill="#5fa35f" />
      <path d="M40 72c12-4 18-12 16-22-10 2-14 10-16 22Z" fill="#7fbf6e" />
      <g transform="translate(40 42)">
        {[0, 60, 120, 180, 240, 300].map((d) => (
          <ellipse key={d} cx="0" cy="-7" rx="3.2" ry="6" fill="#f3d9a0" transform={`rotate(${d})`} />
        ))}
        <circle r="3.4" fill="#e07a3d" />
      </g>
    </svg>
  );
}
