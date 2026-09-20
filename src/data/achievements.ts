export type AchievementDef = {
  id: string;
  title: string;
  line: string;
};

export const achievementDefs: AchievementDef[] = [
  {
    id: 'first_sprout',
    title: 'Первое растение',
    line: 'Мир начался с одного ростка.',
  },
  {
    id: 'first_water',
    title: 'Первый полив',
    line: 'Ты услышал, что почва просит воду.',
  },
  {
    id: 'sorter',
    title: 'Мастер сортировки',
    line: 'Шесть вещей нашли своё место.',
  },
  {
    id: 'explorer',
    title: 'Экологический исследователь',
    line: 'Три тропы энциклопедии пройдены до конца.',
  },
  {
    id: 'water_keeper',
    title: 'Забота о воде',
    line: 'Пять раз растение напилось вовремя.',
  },
  {
    id: 'seven_days',
    title: '7 дней заботы',
    line: 'Неделя, в которую о нём помнили.',
  },
  {
    id: 'ten_facts',
    title: '10 изученных фактов',
    line: 'Знание, которое уже можно применить.',
  },
  {
    id: 'bloom',
    title: 'Цветение',
    line: 'Растение доверилось тебе настолько, что зацвело.',
  },
  {
    id: 'companion',
    title: 'Не один на поляне',
    line: 'Рядом появился второй живой след.',
  },
  {
    id: 'clear_sky',
    title: 'Светлее небо',
    line: 'Поляна стала чище, чем была вчера.',
  },
];
