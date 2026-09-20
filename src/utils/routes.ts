import type { View } from '../types';

const paths: Record<View, string> = {
  world: '/',
  encyclopedia: '/encyclopedia',
  games: '/games',
  achievements: '/achievements',
  team: '/team',
};

const titles: Record<View, string> = {
  world: 'Росток — твой маленький мир',
  encyclopedia: 'Знания — Росток',
  games: 'Игры — Росток',
  achievements: 'Следы — Росток',
  team: 'Команда — Росток',
};

export function pathFromView(view: View) {
  return paths[view];
}

export function titleFromView(view: View) {
  return titles[view];
}

export function viewFromPath(pathname: string): View {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/encyclopedia') return 'encyclopedia';
  if (clean === '/games') return 'games';
  if (clean === '/achievements') return 'achievements';
  if (clean === '/team') return 'team';
  return 'world';
}
