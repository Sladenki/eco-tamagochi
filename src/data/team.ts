import type { TeamMember } from '../types';

// role / tags / achievements / facts — заполняются здесь, UI подхватит сам.
export const teamMembers: TeamMember[] = [
  {
    name: 'Максим Олейник',
    university: 'КГТУ',
    role: '',
    tags: [],
    achievements: [],
    facts: [],
    photo: '/photos/max.jpg',
    photoPos: '52% 22%',
  },
  {
    name: 'Полина Поух',
    university: 'КГТУ',
    role: '',
    tags: [],
    achievements: [],
    facts: [],
    photo: '/photos/polina.jpg',
    photoPos: '42% 18%',
  },
  {
    name: 'Саша Палухина',
    university: 'КГТУ',
    role: '',
    tags: [],
    achievements: [],
    facts: [],
    photo: '/photos/sasha.jpg',
    photoPos: '48% 22%',
  },
  {
    name: 'Марк Сахар',
    university: 'КГТУ',
    role: 'Фронтенд-разработчик',
    tags: ['React', 'Next.js', 'Архитектура', 'Интерфейс', '3+ года'],
    achievements: [
      {
        title: 'GraphON',
        tags: [
          'Победитель · Поколение Z 2024',
          'Победитель · Росмолодёжь.Гранты',
          'Победитель · Студенческий стартап',
          'Победитель · ЯвДеле',
          'Победитель · Бизнес Баттл, 7 сезон',
        ],
        line: 'Интерактивная университетская платформа внеучебного расписания.',
      },
      {
        title: 'Решение в коде',
        tags: ['Хакатон', 'Победитель'],
        line: 'Веб-приложение для научно-исследовательской лаборатории.',
      },
      {
        title: 'Дни науки',
        tags: ['Конференция', 'Победитель'],
        line: 'Проектирование информационных процессов в компании.',
      },
      {
        title: 'Машинное обучение',
        tags: ['СПбПУ', '2024'],
        line: 'Международная программа «Теория и применение» в Политехническом университете Петра Великого.',
      },
    ],
    facts: ['Собираю современные веб-приложения: от схемы до сложного интерфейса.'],
    photo: '/photos/mark.jpg',
    photoPos: '50% 18%',
  },
];
