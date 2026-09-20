export type Habit = {
  id: string;
  title: string;
  body: string;
};

export const habits: Habit[] = [
  {
    id: 'bottle',
    title: 'Сегодня без одноразовой бутылки',
    body: 'Возьми свою. Одно это уже меняет след дня.',
  },
  {
    id: 'walk',
    title: 'Пройди кусок пути пешком',
    body: 'Даже короткая прогулка — меньше выхлопа и больше внимания к улице.',
  },
  {
    id: 'light',
    title: 'Выключи свет, который тебе не нужен',
    body: 'Пустая комната не обязана гореть. Росток любит темноту ночи так же, как солнце.',
  },
  {
    id: 'bag',
    title: 'Возьми многоразовую сумку',
    body: 'Пакет живёт минуту в руке и годы в земле. Сумка — наоборот.',
  },
];

export function habitForDate(isoDate: string): Habit {
  const seed = isoDate.split('-').reduce((sum, part) => sum + Number(part), 0);
  return habits[seed % habits.length];
}
