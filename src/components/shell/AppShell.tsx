import { AnimatePresence } from 'framer-motion';
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
    <div className="relative h-[100dvh] w-full max-w-[100vw] overflow-hidden">
      <WorldPage />

      <AnimatePresence mode="wait">
        {view === 'encyclopedia' && (
          <JournalLayer key="encyclopedia">
            <EncyclopediaPage />
          </JournalLayer>
        )}
        {view === 'games' && (
          <JournalLayer key="games">
            <GamesPage />
          </JournalLayer>
        )}
        {view === 'achievements' && (
          <JournalLayer key="achievements">
            <AchievementsPage />
          </JournalLayer>
        )}
        {view === 'team' && (
          <JournalLayer key="team">
            <TeamPage />
          </JournalLayer>
        )}
      </AnimatePresence>

      <HorizonNav view={view} onChange={setView} />
    </div>
  );
}
