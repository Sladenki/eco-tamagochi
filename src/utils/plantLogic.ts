import { achievementDefs } from '../data/achievements';
import { stageVoice } from '../data/plantCopy';
import type {
  Atmosphere,
  Debris,
  GameState,
  HumanStatus,
  PlantStage,
  WorldLitter,
} from '../types';

export function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

export function todayISO(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createInitialState(): GameState {
  const now = Date.now();
  return {
    createdAt: now,
    lastVisit: now,
    lastInteraction: now,
    lastWatered: 0,
    water: 26,
    vitality: 68,
    growth: 16,
    pollution: 46,
    companionPlanted: false,
    litter: [
      { id: 'litter-bottle', type: 'plastic', x: 12, y: 72 },
      { id: 'litter-paper', type: 'paper', x: 82, y: 70 },
    ],
    debris: [{ id: 'debris-1', x: 28, y: 74 }],
    sortedCorrect: 0,
    factsLearned: [],
    topicsCompleted: [],
    topicStep: {},
    habitsCompleted: [],
    lastHabitDate: '',
    careDays: [todayISO()],
    achievementsUnlocked: ['first_sprout'],
    waterCount: 0,
    reviveCount: 0,
  };
}

function spawnLitter(existing: WorldLitter[]): WorldLitter[] {
  const spots = [
    { type: 'plastic' as const, x: 10, y: 71 },
    { type: 'glass' as const, x: 86, y: 69 },
    { type: 'metal' as const, x: 20, y: 76 },
    { type: 'battery' as const, x: 74, y: 75 },
    { type: 'organic' as const, x: 38, y: 77 },
  ];
  const have = new Set(existing.map((item) => item.type));
  const next = spots.find((spot) => !have.has(spot.type));
  if (!next) return existing;
  return [...existing, { id: uid('litter'), ...next }];
}

function spawnDebris(existing: Debris[]): Debris[] {
  if (existing.length >= 3) return existing;
  const spots = [
    { x: 26, y: 73 },
    { x: 64, y: 76 },
    { x: 46, y: 78 },
  ];
  const used = new Set(existing.map((d) => `${d.x}-${d.y}`));
  const free = spots.find((s) => !used.has(`${s.x}-${s.y}`));
  if (!free) return existing;
  return [...existing, { id: uid('debris'), ...free }];
}

export function applyTimeDecay(state: GameState): {
  state: GameState;
  hoursAway: number;
} {
  const now = Date.now();
  const hoursAway = Math.max(0, (now - state.lastVisit) / 3_600_000);
  if (hoursAway < 0.08) {
    return { state: { ...state, lastVisit: now }, hoursAway };
  }

  let water = state.water - hoursAway * 2.15;
  let vitality = state.vitality;
  let growth = state.growth;
  let pollution = state.pollution + hoursAway * 0.7;
  let litter = state.litter;
  let debris = state.debris;

  if (water < 18) vitality -= hoursAway * 3.1;
  else if (water < 38) vitality -= hoursAway * 1.35;
  else vitality -= hoursAway * 0.32;

  if (water > 55 && vitality > 55 && hoursAway < 36) {
    growth += hoursAway * 0.18;
  }

  if (hoursAway > 8 && litter.length < 4) {
    litter = spawnLitter(litter);
  }
  if (hoursAway > 16 && litter.length < 5) {
    litter = spawnLitter(litter);
  }
  if (hoursAway > 10) {
    debris = spawnDebris(debris);
  }

  const next: GameState = {
    ...state,
    water: clamp(water),
    vitality: clamp(vitality),
    growth: clamp(growth),
    pollution: clamp(pollution),
    litter,
    debris,
    lastVisit: now,
  };

  return { state: unlockAchievements(next), hoursAway };
}

export function getPlantStage(state: GameState): PlantStage {
  if (state.vitality <= 2) return 'dead';
  if (state.vitality < 28) return 'wilting';
  if (state.growth < 9) return 'seed';
  if (state.growth < 26) return 'sprout';
  if (state.growth < 48) return 'young';
  if (state.growth < 76) return 'healthy';
  return 'blooming';
}

export function getHumanStatus(
  state: GameState,
  hoursAway = 0,
  isFresh = false,
): HumanStatus {
  const stage = getPlantStage(state);
  if (isFresh) {
    return {
      title: 'Это твоё растение',
      detail: 'Оно уже смотрит на тебя. Мир вокруг тоже живой — попробуй его коснуться.',
      mood: 'new',
    };
  }
  if (stage === 'dead') {
    return {
      title: 'Растение погибло',
      detail: 'Ему было одиноко слишком долго. Земля ещё помнит — можно посадить заново.',
      mood: 'dead',
    };
  }
  if (state.water < 24) {
    return {
      title: 'Ему давно не хватало воды',
      detail: 'Почва сухая. Коснись растения — оно пьёт, когда ты рядом.',
      mood: 'thirsty',
    };
  }
  if (stage === 'wilting') {
    return {
      title: 'Растение начинает увядать',
      detail: 'Листья тяжелеют. Ему нужна вода, чистое место и немного твоего времени.',
      mood: 'sad',
    };
  }
  if (state.pollution > 72) {
    return {
      title: 'Воздуху тяжело',
      detail: 'Мусор на поляне делает дыхание гуще. Убери то, что не принадлежит земле.',
      mood: 'polluted',
    };
  }
  if (stage === 'blooming' && state.vitality > 62) {
    return {
      title: 'Растению очень хорошо',
      detail: 'Оно цветёт. Ты хранитель, к которому хочется тянуться.',
      mood: 'bloom',
    };
  }
  if (hoursAway >= 10 && state.vitality > 40) {
    return {
      title: 'Оно тебя ждало',
      detail: 'Мир притих, но не обиделся. Можно просто побыть рядом.',
      mood: 'calm',
    };
  }
  if (state.water > 62 && state.vitality > 64) {
    return {
      title: 'Растению хорошо',
      detail: 'Отличный день для роста. Можно исследовать или просто смотреть.',
      mood: 'happy',
    };
  }
  return {
    title: 'Спокойный день',
    detail: stageVoice[stage],
    mood: 'calm',
  };
}

export function getAtmosphere(state: GameState): Atmosphere {
  const cleanliness = 100 - state.pollution;
  if (cleanliness > 78) {
    return {
      label: 'Экосистема в равновесии',
      whisper: 'Небо лёгкое, как после дождя.',
      cleanliness,
    };
  }
  if (cleanliness > 55) {
    return {
      label: 'Воздух ещё дышит',
      whisper: 'Чуть чище — и поляна зазвучит звонче.',
      cleanliness,
    };
  }
  if (cleanliness > 32) {
    return {
      label: 'Загрязнение растёт',
      whisper: 'Дымка гуще обычного. Миру нужна уборка.',
      cleanliness,
    };
  }
  return {
    label: 'Небу тяжело',
    whisper: 'Слишком много лишнего на земле и в воздухе.',
    cleanliness,
  };
}

export function unlockAchievements(state: GameState): GameState {
  const have = new Set(state.achievementsUnlocked);
  const stage = getPlantStage(state);
  const checks: [string, boolean][] = [
    ['first_sprout', true],
    ['first_water', state.waterCount >= 1],
    ['sorter', state.sortedCorrect >= 6],
    ['explorer', state.topicsCompleted.length >= 3],
    ['water_keeper', state.waterCount >= 5],
    ['seven_days', state.careDays.length >= 7],
    ['ten_facts', state.factsLearned.length >= 10],
    ['bloom', stage === 'blooming'],
    ['companion', state.companionPlanted],
    ['clear_sky', state.pollution <= 22 && state.litter.length === 0],
  ];
  for (const [id, ok] of checks) {
    if (ok && achievementDefs.some((item) => item.id === id)) have.add(id);
  }
  return { ...state, achievementsUnlocked: [...have] };
}

export function markCareDay(state: GameState): GameState {
  const day = todayISO();
  const careDays = state.careDays.includes(day)
    ? state.careDays
    : [...state.careDays, day];
  return unlockAchievements({
    ...state,
    careDays,
    lastInteraction: Date.now(),
  });
}

export function skyColors(state: GameState) {
  const haze = state.pollution / 100;
  const wilt = getPlantStage(state) === 'dead' ? 0.35 : 0;
  const mix = Math.min(1, haze * 0.85 + wilt);
  return {
    top: mixHex('#C5DCE8', '#8F9590', mix),
    mid: mixHex('#E7F1D6', '#C4B59A', mix),
    bottom: mixHex('#F3E9D2', '#B9A58A', mix),
    sun: mixHex('#F2D56B', '#C7B07A', mix * 0.7),
    hill: mixHex('#8FB56A', '#7A7A5C', mix),
    hillFar: mixHex('#A7C388', '#8A8A72', mix),
  };
}

function mixHex(a: string, b: string, t: number) {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  const m = (i: number) => Math.round(pa[i] + (pb[i] - pa[i]) * t);
  return `rgb(${m(0)}, ${m(1)}, ${m(2)})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
