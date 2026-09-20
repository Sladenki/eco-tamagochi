import { memo, type CSSProperties } from 'react';

type Sky = {
  top: string;
  mid: string;
  bottom: string;
  sun: string;
  hill: string;
  hillFar: string;
};

export const Landscape = memo(function Landscape({
  sky,
  dull,
}: {
  sky: Sky;
  dull: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ contain: 'paint' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${sky.top} 0%, ${sky.mid} 42%, ${sky.bottom} 100%)`,
          opacity: dull ? 0.86 : 1,
        }}
      />

      <div
        className="absolute right-[12%] top-[11%] h-12 w-12 rounded-full sm:h-16 sm:w-16 md:h-24 md:w-24 md:shadow-[0_0_60px_var(--sun)]"
        style={{ background: sky.sun, ['--sun' as string]: sky.sun }}
      />

      <svg
        className="cloud-drift absolute left-[8%] top-[14%] hidden w-28 opacity-80 sm:block md:w-40"
        viewBox="0 0 160 60"
        fill="white"
      >
        <ellipse cx="50" cy="34" rx="30" ry="16" />
        <ellipse cx="78" cy="28" rx="26" ry="18" />
        <ellipse cx="108" cy="36" rx="28" ry="14" />
      </svg>
      <svg
        className="cloud-drift slow absolute right-[18%] top-[20%] hidden w-24 opacity-70 sm:block md:w-36"
        viewBox="0 0 160 60"
        fill="white"
      >
        <ellipse cx="54" cy="36" rx="28" ry="14" />
        <ellipse cx="84" cy="30" rx="24" ry="16" />
        <ellipse cx="112" cy="36" rx="22" ry="12" />
      </svg>

      <svg
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[58%] w-full"
      >
        <path
          d="M0 220 C 180 160 280 190 420 170 C 580 148 640 210 820 180 C 980 154 1100 200 1440 150 L 1440 500 L 0 500 Z"
          fill={sky.hillFar}
          opacity="0.85"
        />
        <path
          d="M0 300 C 200 240 340 280 520 250 C 720 214 820 300 1040 260 C 1200 232 1320 270 1440 240 L 1440 500 L 0 500 Z"
          fill={sky.hill}
        />
        <path
          d="M0 360 C 160 320 300 350 480 330 C 700 304 860 370 1100 340 C 1260 322 1360 350 1440 336 L 1440 500 L 0 500 Z"
          fill="#d7c39a"
        />
        <path
          d="M0 410 C 220 388 400 430 640 404 C 900 374 1120 430 1440 400 L 1440 500 L 0 500 Z"
          fill="#c9b07d"
        />
        <ellipse cx="180" cy="430" rx="18" ry="8" fill="#8a8a7a" opacity="0.45" />
        <ellipse cx="1180" cy="438" rx="22" ry="9" fill="#7d7a6c" opacity="0.4" />
      </svg>

      <Grove />

      <div
        className="absolute inset-x-0 bottom-0 h-28"
        style={
          {
            background:
              'linear-gradient(180deg, transparent, rgba(90, 58, 32, 0.18) 40%, rgba(90, 58, 32, 0.28))',
          } as CSSProperties
        }
      />
    </div>
  );
});

function Grove() {
  return (
    <div className="absolute inset-0">
      <TreeMark
        className="absolute bottom-[34%] left-[3%] h-[22vmin] w-[14vmin] min-h-28 min-w-16"
        variant="oak"
      />
      <TreeMark
        className="absolute bottom-[31%] left-[11%] hidden h-[16vmin] w-[10vmin] min-h-20 min-w-12 sm:block"
        variant="round"
      />
      <TreeMark
        className="absolute right-[12%] bottom-[36%] hidden h-[18vmin] w-[9vmin] min-h-24 min-w-11 md:block"
        variant="pine"
      />
      <TreeMark
        className="absolute right-[4%] bottom-[32%] h-[26vmin] w-[15vmin] min-h-32 min-w-16"
        variant="oak"
      />
    </div>
  );
}

function TreeMark({
  className,
  variant,
}: {
  className: string;
  variant: 'oak' | 'round' | 'pine';
}) {
  return (
    <svg viewBox="0 0 80 120" className={className} aria-hidden>
      {variant === 'oak' && <OakCanopy />}
      {variant === 'round' && <RoundCanopy />}
      {variant === 'pine' && <PineCanopy />}
    </svg>
  );
}

function OakCanopy() {
  return (
    <g>
      <ellipse cx="40" cy="114" rx="16" ry="3.5" fill="#5c3a24" opacity="0.18" />
      <path
        d="M37 62c-1.2 16-2.4 28-4 50h14c-1.8-18-3-34-4.2-50-1.6-2.2-4.2-2.2-5.8 0Z"
        fill="#6b4a32"
      />
      <path d="M39.2 64c.6 8 .4 18-.2 28" stroke="#5a3a24" strokeWidth="1.2" fill="none" opacity="0.35" />
      <path
        d="M40 8c12 1 22 9 24 20 10 2 16 12 12 22 8 6 6 18-4 22 2 12-8 20-20 18-8 8-24 6-28-6-12 0-18-12-12-22-6-8-2-20 8-24C22 16 30 7 40 8Z"
        fill="#355f3c"
      />
      <path
        d="M42 14c8 2 14 8 15 16 6 1 10 8 6 14-1 8-9 12-16 10-4 4-12 3-14-4-6 0-9-7-5-12-3-5 0-12 6-14 2-6 5-10 8-10Z"
        fill="#4f7d52"
        opacity="0.9"
      />
      <path
        d="M28 48c6-8 16-10 22-4 2 6-2 12-10 14-8 1-14-3-12-10Z"
        fill="#2c4f34"
        opacity="0.55"
      />
    </g>
  );
}

function RoundCanopy() {
  return (
    <g>
      <ellipse cx="40" cy="114" rx="12" ry="3" fill="#5c3a24" opacity="0.16" />
      <path d="M38 70c-1 14-2 28-3 42h10c-1-14-2-28-3-42-1-1.6-3-1.6-4 0Z" fill="#6b4a32" />
      <path
        d="M40 22c11 0 20 9 20 22 8 2 12 12 6 20-2 12-14 18-24 14-10 6-24 0-24-14-6-6-4-16 4-20 0-13 8-22 18-22Z"
        fill="#3d6b45"
      />
      <path
        d="M36 28c8 0 14 6 14 14 4 1 7 7 3 12-2 7-10 10-16 7-6 3-14 0-14-8-4-3-2-10 3-12 0-8 5-13 10-13Z"
        fill="#5f8a56"
        opacity="0.85"
      />
    </g>
  );
}

function PineCanopy() {
  return (
    <g>
      <ellipse cx="40" cy="114" rx="10" ry="2.6" fill="#5c3a24" opacity="0.16" />
      <path d="M38.5 78c-.4 10-.8 22-1.4 34h6.8c-.6-12-1-24-1.4-34-.4-1-2.6-1-4 0Z" fill="#6b4a32" />
      <path d="M40 18 58 48H22Z" fill="#2f5a38" />
      <path d="M40 34 62 66H18Z" fill="#355f3d" />
      <path d="M40 52 64 88H16Z" fill="#2c5334" />
      <path d="M40 20 50 40H30Z" fill="#4a7a52" opacity="0.55" />
    </g>
  );
}
