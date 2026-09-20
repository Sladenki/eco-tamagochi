import { AchievementsPage } from '../../pages/AchievementsPage';
import { EncyclopediaPage } from '../../pages/EncyclopediaPage';
import { GamesPage } from '../../pages/GamesPage';
import { HorizonNav } from '../navigation/HorizonNav';
import { JournalLayer } from './JournalLayer';
import { TeamPage } from '../../pages/TeamPage';
import { WorldPage } from '../../pages/WorldPage';
import { useGame } from '../../hooks/useGame';

export function AppShell() {
  const { view, setView } = useGame();

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <WorldPage />

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

      <HorizonNav view={view} onChange={setView} />
    </div>
  );
}
