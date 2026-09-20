import { GameProvider } from './state/GameProvider';
import { AppShell } from './components/shell/AppShell';

export default function App() {
  return (
    <GameProvider>
      <AppShell />
    </GameProvider>
  );
}
