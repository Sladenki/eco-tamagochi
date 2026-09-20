export type EcoAction = {
  id: string;
  title: string;
  prompt: string;
};

export const ecoActions: EcoAction[] = [
  {
    id: 'water',
    title: 'Полив',
    prompt: 'Коснись растения, если почва сухая.',
  },
  {
    id: 'sort',
    title: 'Сортировка',
    prompt: 'Подними то, что не принадлежит поляне.',
  },
  {
    id: 'clean',
    title: 'Уборка',
    prompt: 'Ветки и обрывки можно убрать одним касанием.',
  },
  {
    id: 'plant',
    title: 'Посадка',
    prompt: 'Пустой клочок земли ждёт соседа.',
  },
  {
    id: 'habit',
    title: 'Задание дня',
    prompt: 'Семечко в небе — обещание, а не список.',
  },
];
