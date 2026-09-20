import type { WasteType } from '../../types';
import type { Bin } from '../../data/gameData';

export const binTone: Record<
  WasteType,
  { fill: string; ink: string; lid: string }
> = {
  plastic: { fill: '#E8C547', ink: '#4A3A10', lid: '#C9A62E' },
  paper: { fill: '#6BA4C9', ink: '#16344A', lid: '#4E84A8' },
  glass: { fill: '#5E9A68', ink: '#14321C', lid: '#3F7A4C' },
  metal: { fill: '#B7B3AB', ink: '#2E2D2A', lid: '#8E8A83' },
  battery: { fill: '#E07A3D', ink: '#3D1A08', lid: '#C45E28' },
  organic: { fill: '#7A5135', ink: '#F4EEE3', lid: '#5C3A24' },
};

export function WasteGlyph({
  type,
  className = 'h-16 w-12',
}: {
  type: WasteType;
  className?: string;
}) {
  if (type === 'plastic') {
    return (
      <svg viewBox="0 0 48 88" className={className} aria-hidden>
        <path d="M16 16h16l4 8v46a12 12 0 0 1-24 0V24l4-8Z" fill="#7EB3C9" />
        <path d="M18 18h12l2 6H16l2-6Z" fill="#A9D4E2" />
        <rect x="18" y="6" width="12" height="12" rx="2" fill="#4F7F90" />
        <path d="M20 42h8" stroke="#4F7F90" strokeWidth="2" />
      </svg>
    );
  }
  if (type === 'paper') {
    return (
      <svg viewBox="0 0 72 56" className={className} aria-hidden>
        <path
          d="M10 12c14 10 22-8 36 4 8 6-2 30-18 26C14 38 2 22 10 12Z"
          fill="#F4E6C8"
          stroke="#C9B07D"
          strokeWidth="2"
        />
        <path d="M22 22h22M20 30h18" stroke="#C9B07D" strokeWidth="1.6" />
      </svg>
    );
  }
  if (type === 'glass') {
    return (
      <svg viewBox="0 0 40 84" className={className} aria-hidden>
        <path d="M14 10h12l3 12-5 46a9 9 0 0 1-18 0L11 22l3-12Z" fill="#8FC7B5" />
        <path d="M16 12h8l1 6H15l1-6Z" fill="#C8E8DC" />
        <rect x="16" y="4" width="8" height="8" rx="1" fill="#4E8A78" />
      </svg>
    );
  }
  if (type === 'metal') {
    return (
      <svg viewBox="0 0 64 52" className={className} aria-hidden>
        <rect x="8" y="14" width="48" height="30" rx="8" fill="#C5C4BE" />
        <rect x="16" y="6" width="32" height="12" rx="4" fill="#9A9A93" />
        <rect x="14" y="20" width="36" height="8" rx="2" fill="#E4E3DE" />
      </svg>
    );
  }
  if (type === 'battery') {
    return (
      <svg viewBox="0 0 40 72" className={className} aria-hidden>
        <rect x="8" y="14" width="24" height="50" rx="4" fill="#3D3D3A" />
        <rect x="14" y="6" width="12" height="10" rx="2" fill="#C9C9C2" />
        <rect x="12" y="22" width="16" height="12" fill="#E6C35C" />
        <path d="M18 26h4M20 24v8" stroke="#3D3D3A" strokeWidth="1.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 56 48" className={className} aria-hidden>
      <path d="M10 30c8-18 28-18 34 0-10 12-28 12-34 0Z" fill="#C4844A" />
      <path d="M18 24c4-6 10-6 14 0" stroke="#F4E4B8" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function BinWell({
  bin,
  active,
  onClick,
  wellRef,
}: {
  bin: Bin;
  active?: boolean;
  onClick?: () => void;
  wellRef?: (el: HTMLButtonElement | null) => void;
}) {
  const tone = binTone[bin.id];
  return (
    <button
      ref={wellRef}
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center transition ${active ? 'scale-105' : ''}`}
    >
      <span
        className="h-3 w-[78%] rounded-t-md"
        style={{ background: tone.lid }}
      />
      <span
        className="flex h-16 w-full flex-col items-center justify-end rounded-b-2xl px-1 pb-2 sm:h-[4.5rem]"
        style={{ background: tone.fill, color: tone.ink }}
      >
        <span className="text-[11px] font-semibold leading-tight">{bin.label}</span>
      </span>
    </button>
  );
}
