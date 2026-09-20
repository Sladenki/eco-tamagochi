import { createContext } from 'react';
import type { Habit } from '../data/habits';
import type {
  Atmosphere,
  BinId,
  Feedback,
  GameState,
  HumanStatus,
  PlantStage,
  View,
  WasteType,
} from '../types';
import type { skyColors } from '../utils/plantLogic';

export type SortResult = { ok: boolean; message: string };

export type GameContextValue = {
  state: GameState;
  view: View;
  setView: (view: View) => void;
  stage: PlantStage;
  status: HumanStatus;
  atmosphere: Atmosphere;
  sky: ReturnType<typeof skyColors>;
  hoursAway: number;
  welcome: string | null;
  dismissWelcome: () => void;
  feedback: Feedback | null;
  watering: boolean;
  todayHabit: Habit;
  habitDoneToday: boolean;
  waterPlant: () => void;
  sortWaste: (type: WasteType, bin: BinId) => SortResult;
  pickLitter: (id: string, type: WasteType, bin: BinId) => SortResult;
  cleanDebris: (id: string) => void;
  plantCompanion: () => void;
  completeHabit: () => void;
  learnFact: (id: string) => void;
  setTopicStep: (topicId: string, step: number) => void;
  completeTopic: (topicId: string) => void;
  revive: () => void;
  touchPlant: () => string;
  activeTopicId: string | null;
  setActiveTopicId: (id: string | null) => void;
  sortFocus: WasteType | null;
  setSortFocus: (type: WasteType | null) => void;
};

export const GameContext = createContext<GameContextValue | null>(null);
