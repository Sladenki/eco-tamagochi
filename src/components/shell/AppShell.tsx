import { lazy, Suspense } from 'react';
import { HorizonNav } from '../navigation/HorizonNav';
import { JournalLayer } from './JournalLayer';
import { WorldPage } from '../../pages/WorldPage';
import { useGame } from '../../hooks/useGame';

const EncyclopediaPage = lazy(() =>
  import('../../pages/EncyclopediaPage').then((m) => ({ default: m.EncyclopediaPage })),
);
const GamesPage = lazy(() =>
  import('../../pages/GamesPage').then((m) => ({ default: m.GamesPage })),
);
const AchievementsPage = lazy(() =>
  import('../../pages/AchievementsPage').then((m) => ({ default: m.AchievementsPage })),
);
const TeamPage = lazy(() =>
  import('../../pages/TeamPage').then((m) => ({ default: m.TeamPage })),
);

function JournalFallback() {
  return <div className="absolute inset-0 z-20 bg-[#f4eee3]" />;
}

export function AppShell() {
  const { view, setView } = useGame();
  const onWorld = view === 'world';

  return (
    <div className="relative h-[100dvh] w-full max-w-[100vw] overflow-hidden">
      <div hidden={!onWorld} className="h-full">
        <WorldPage />
      </div>

      <Suspense fallback={<JournalFallback />}>
        {view === 'encyclopedia' && (
          <JournalLayer>
            <EncyclopediaPage />
          </JournalLayer>
        )}
        {view === 'games' && (
          <JournalLayer>
            <GamesPage />
          </JournalLayer>
        )}
        {view === 'achievements' && (
          <JournalLayer>
            <AchievementsPage />
          </JournalLayer>
        )}
        {view === 'team' && (
          <JournalLayer>
            <TeamPage />
          </JournalLayer>
        )}
      </Suspense>

      <HorizonNav view={view} onChange={setView} />
    </div>
  );
}
