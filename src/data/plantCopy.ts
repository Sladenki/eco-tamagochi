import type { PlantStage } from '../types';

export const stageVoice: Record<PlantStage, string> = {
  seed: 'Семечко ещё спит в земле.',
  sprout: 'Росток только учится держать стебель.',
  young: 'Молодое растение уже узнаёт тебя.',
  healthy: 'Оно стоит уверенно и тянется к свету.',
  blooming: 'Цветение — это благодарность.',
  wilting: 'Листья опускаются. Ему трудно.',
  dead: 'Тишина. Но землю можно разбудить снова.',
};
