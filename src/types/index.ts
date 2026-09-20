export type View =
  | 'world'
  | 'encyclopedia'
  | 'games'
  | 'achievements'
  | 'team';

export type PlantStage =
  | 'seed'
  | 'sprout'
  | 'young'
  | 'healthy'
  | 'blooming'
  | 'wilting'
  | 'dead';

export type WasteType =
  | 'plastic'
  | 'paper'
  | 'glass'
  | 'metal'
  | 'battery'
  | 'organic';

export type BinId = WasteType;

export type WorldLitter = {
  id: string;
  type: WasteType;
  x: number;
  y: number;
};

export type Debris = {
  id: string;
  x: number;
  y: number;
};

export type GameState = {
  createdAt: number;
  lastVisit: number;
  lastInteraction: number;
  lastWatered: number;
  water: number;
  vitality: number;
  growth: number;
  pollution: number;
  companionPlanted: boolean;
  litter: WorldLitter[];
  debris: Debris[];
  sortedCorrect: number;
  factsLearned: string[];
  topicsCompleted: string[];
  topicStep: Record<string, number>;
  habitsCompleted: string[];
  lastHabitDate: string;
  careDays: string[];
  achievementsUnlocked: string[];
  waterCount: number;
  reviveCount: number;
};

export type HumanStatus = {
  title: string;
  detail: string;
  mood: 'new' | 'happy' | 'thirsty' | 'sad' | 'polluted' | 'bloom' | 'dead' | 'calm';
};

export type Atmosphere = {
  label: string;
  whisper: string;
  cleanliness: number;
};

export type Feedback = {
  id: string;
  text: string;
  tone: 'good' | 'soft' | 'info';
};

export type TeamMember = {
  name: string;
  university: string;
  role: string;
  achievements: string[];
  facts: string[];
};

export type EncyclopediaStep =
  | {
      type: 'fact';
      id: string;
      kicker: string;
      title: string;
      body: string;
    }
  | {
      type: 'visual';
      id: string;
      title: string;
      body: string;
      visual: 'co2' | 'climate' | 'recycle' | 'water' | 'bee' | 'habit';
    }
  | {
      type: 'question';
      id: string;
      question: string;
      options: { id: string; text: string; correct: boolean; hint: string }[];
    }
  | {
      type: 'bridge';
      id: string;
      title: string;
      body: string;
      cta: string;
      go: View | 'water';
    };

export type EncyclopediaTopic = {
  id: string;
  title: string;
  phrase: string;
  accent: string;
  steps: EncyclopediaStep[];
};
