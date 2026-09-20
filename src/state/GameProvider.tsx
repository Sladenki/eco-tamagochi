import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { encyclopediaTopics } from '../data/encyclopedia';
import { habitForDate } from '../data/habits';
import { sortMistakes } from '../data/gameData';
import type { BinId, Feedback, GameState, View, WasteType } from '../types';
import {
  applyTimeDecay,
  clamp,
  createInitialState,
  getAtmosphere,
  getHumanStatus,
  getPlantStage,
  markCareDay,
  skyColors,
  todayISO,
  unlockAchievements,
} from '../utils/plantLogic';
import { loadState, saveState } from '../utils/storage';
import { GameContext, type GameContextValue, type SortResult } from './gameContext';

function hydrate(): { state: GameState; hoursAway: number; fresh: boolean } {
  const loaded = loadState();
  const fresh = !loaded;
  const base = loaded ?? createInitialState();
  const { state, hoursAway } = applyTimeDecay(base);
  saveState(state);
  return { state, hoursAway, fresh };
}

export function GameProvider({ children }: { children: ReactNode }) {
  const boot = useMemo(() => hydrate(), []);
  const [state, setState] = useState<GameState>(boot.state);
  const [view, setView] = useState<View>('world');
  const [hoursAway] = useState(boot.hoursAway);
  const [welcome, setWelcome] = useState<string | null>(() => {
    if (boot.fresh) return null;
    if (boot.hoursAway >= 4) return 'Ты вернулся';
    return null;
  });
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [watering, setWatering] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [sortFocus, setSortFocus] = useState<WasteType | null>(null);

  const persist = useCallback((updater: (prev: GameState) => GameState) => {
    setState((prev) => {
      const next = unlockAchievements(updater(prev));
      saveState(next);
      return next;
    });
  }, []);

  const say = useCallback((text: string, tone: Feedback['tone'] = 'good') => {
    const item = { id: `${Date.now()}`, text, tone };
    setFeedback(item);
    window.setTimeout(() => {
      setFeedback((current) => (current?.id === item.id ? null : current));
    }, 2800);
  }, []);

  const stage = getPlantStage(state);
  const status = getHumanStatus(state, hoursAway, false);
  const atmosphere = getAtmosphere(state);
  const sky = skyColors(state);
  const todayHabit = habitForDate(todayISO());
  const habitDoneToday = state.lastHabitDate === todayISO();

  const waterPlant = useCallback(() => {
    if (getPlantStage(state) === 'dead') return;
    if (state.water > 88) {
      say('Почва ещё влажная — подождём.', 'info');
      return;
    }
    setWatering(true);
    window.setTimeout(() => setWatering(false), 1400);
    persist((prev) =>
      markCareDay({
        ...prev,
        water: clamp(prev.water + 34),
        vitality: clamp(prev.vitality + 8),
        growth: clamp(prev.growth + 3.5),
        lastWatered: Date.now(),
        waterCount: prev.waterCount + 1,
      }),
    );
    say('Вода ушла к корням. Стало легче.', 'good');
  }, [persist, say, state]);

  const sortWaste = useCallback(
    (type: WasteType, bin: BinId): SortResult => {
      if (type !== bin) {
        return { ok: false, message: sortMistakes[type] };
      }
      persist((prev) =>
        markCareDay({
          ...prev,
          sortedCorrect: prev.sortedCorrect + 1,
          pollution: clamp(prev.pollution - 7),
          vitality: clamp(prev.vitality + 4),
          growth: clamp(prev.growth + 1.2),
        }),
      );
      return { ok: true, message: 'Верно. Вещь нашла своё место.' };
    },
    [persist],
  );

  const pickLitter = useCallback(
    (id: string, type: WasteType, bin: BinId): SortResult => {
      const result = sortWaste(type, bin);
      if (!result.ok) return result;
      persist((prev) => ({
        ...prev,
        litter: prev.litter.filter((item) => item.id !== id),
      }));
      say('Поляна стала чище. Росток это чувствует.', 'good');
      return result;
    },
    [persist, say, sortWaste],
  );

  const cleanDebris = useCallback(
    (id: string) => {
      persist((prev) =>
        markCareDay({
          ...prev,
          debris: prev.debris.filter((item) => item.id !== id),
          pollution: clamp(prev.pollution - 5),
          vitality: clamp(prev.vitality + 3),
        }),
      );
      say('Земля свободнее. Можно дышать.', 'good');
    },
    [persist, say],
  );

  const plantCompanion = useCallback(() => {
    if (state.companionPlanted) return;
    persist((prev) =>
      markCareDay({
        ...prev,
        companionPlanted: true,
        vitality: clamp(prev.vitality + 6),
        growth: clamp(prev.growth + 6),
        pollution: clamp(prev.pollution - 4),
      }),
    );
    say('Рядом появился ещё один живой след.', 'good');
  }, [persist, say, state.companionPlanted]);

  const completeHabit = useCallback(() => {
    if (state.lastHabitDate === todayISO()) return;
    persist((prev) =>
      markCareDay({
        ...prev,
        lastHabitDate: todayISO(),
        habitsCompleted: prev.habitsCompleted.includes(todayHabit.id)
          ? prev.habitsCompleted
          : [...prev.habitsCompleted, todayHabit.id],
        pollution: clamp(prev.pollution - 6),
        vitality: clamp(prev.vitality + 5),
      }),
    );
    say('Обещание дня принято. Мир стал спокойнее.', 'good');
  }, [persist, say, state.lastHabitDate, todayHabit.id]);

  const learnFact = useCallback(
    (id: string) => {
      persist((prev) => {
        if (prev.factsLearned.includes(id)) return prev;
        return {
          ...prev,
          factsLearned: [...prev.factsLearned, id],
        };
      });
    },
    [persist],
  );

  const setTopicStep = useCallback(
    (topicId: string, step: number) => {
      persist((prev) => ({
        ...prev,
        topicStep: { ...prev.topicStep, [topicId]: step },
      }));
    },
    [persist],
  );

  const completeTopic = useCallback(
    (topicId: string) => {
      persist((prev) => {
        const topic = encyclopediaTopics.find((item) => item.id === topicId);
        const factIds = topic?.steps.map((step) => step.id) ?? [];
        const factsLearned = [...new Set([...prev.factsLearned, ...factIds])];
        return markCareDay({
          ...prev,
          factsLearned,
          topicsCompleted: prev.topicsCompleted.includes(topicId)
            ? prev.topicsCompleted
            : [...prev.topicsCompleted, topicId],
          vitality: clamp(prev.vitality + 3),
          pollution: clamp(prev.pollution - 3),
        });
      });
    },
    [persist],
  );

  const revive = useCallback(() => {
    persist((prev) =>
      markCareDay({
        ...prev,
        water: 58,
        vitality: 62,
        growth: 12,
        pollution: clamp(prev.pollution - 8),
        lastWatered: Date.now(),
        reviveCount: prev.reviveCount + 1,
        companionPlanted: false,
      }),
    );
    say('Семечко снова в земле. На этот раз мы рядом.', 'soft');
  }, [persist, say]);

  const touchPlant = useCallback(() => {
    if (stage === 'dead') return 'Земля тихая. Можно начать сначала.';
    if (state.water < 28) {
      waterPlant();
      return 'Пьёт.';
    }
    persist((prev) =>
      markCareDay({
        ...prev,
        vitality: clamp(prev.vitality + 1.2),
      }),
    );
    if (stage === 'blooming') return 'Цветок качнулся навстречу.';
    if (stage === 'wilting') return 'Оно ещё здесь. Ему нужна вода.';
    return 'Ему хорошо, что ты рядом.';
  }, [persist, stage, state.water, waterPlant]);

  const value: GameContextValue = {
    state,
    view,
    setView,
    stage,
    status,
    atmosphere,
    sky,
    hoursAway,
    welcome,
    dismissWelcome: () => setWelcome(null),
    feedback,
    watering,
    todayHabit,
    habitDoneToday,
    waterPlant,
    sortWaste,
    pickLitter,
    cleanDebris,
    plantCompanion,
    completeHabit,
    learnFact,
    setTopicStep,
    completeTopic,
    revive,
    touchPlant,
    activeTopicId,
    setActiveTopicId,
    sortFocus,
    setSortFocus,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
