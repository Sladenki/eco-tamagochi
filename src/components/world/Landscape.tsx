import type { CSSProperties } from 'react';

type Sky = {
  top: string;
  mid: string;
  bottom: string;
  sun: string;
  hill: string;
  hillFar: string;
};

export function Landscape({ sky, dull }: { sky: Sky; dull: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ filter: dull ? 'saturate(0.72)' : undefined }}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${sky.top} 0%, ${sky.mid} 42%, ${sky.bottom} 100%)`,
        }}
      />

      <div
        className="absolute right-[12%] top-[11%] h-16 w-16 rounded-full md:h-24 md:w-24"
        style={{ background: sky.sun, boxShadow: `0 0 60px ${sky.sun}` }}
      />

      <svg
        className="cloud-drift absolute left-[8%] top-[14%] w-28 opacity-80 md:w-40"
        viewBox="0 0 160 60"
        fill="white"
      >
        <ellipse cx="50" cy="34" rx="30" ry="16" />
        <ellipse cx="78" cy="28" rx="26" ry="18" />
        <ellipse cx="108" cy="36" rx="28" ry="14" />
      </svg>
      <svg
        className="cloud-drift slow absolute right-[18%] top-[20%] w-24 opacity-70 md:w-36"
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
        <Tree x={120} y={300} h={90} fill="#3d6b45" />
        <Tree x={220} y={318} h={70} fill="#2f5a38" />
        <Tree x={1260} y={292} h={110} fill="#355f3d" />
        <Tree x={1360} y={320} h={78} fill="#2c5334" />
        <ellipse cx="180" cy="430" rx="18" ry="8" fill="#8a8a7a" opacity="0.45" />
        <ellipse cx="1180" cy="438" rx="22" ry="9" fill="#7d7a6c" opacity="0.4" />
      </svg>

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
}

function Tree({
  x,
  y,
  h,
  fill,
}: {
  x: number;
  y: number;
  h: number;
  fill: string;
}) {
  const w = h * 0.72;
  return (
    <g>
      <rect x={x - 4} y={y} width="8" height={h * 0.35} fill="#5a3a24" rx="2" />
      <ellipse cx={x} cy={y} rx={w * 0.55} ry={h * 0.42} fill={fill} />
      <ellipse cx={x - w * 0.18} cy={y + 8} rx={w * 0.28} ry={h * 0.22} fill={fill} opacity="0.85" />
    </g>
  );
}
