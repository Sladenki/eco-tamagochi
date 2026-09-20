import type { GameState } from '../types';

export const STORAGE_KEY = 'rostok-world-v1';

export function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

export function saveState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
}
