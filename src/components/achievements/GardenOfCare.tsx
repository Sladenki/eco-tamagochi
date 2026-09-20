import { achievementDefs } from '../../data/achievements';
import { useGame } from '../../hooks/useGame';

const places = [
  'mt-2 ml-0',
  'mt-10 ml-[12%]',
  'mt-4 ml-[4%]',
  'mt-14 ml-[18%]',
  'mt-6 ml-[2%]',
  'mt-12 ml-[10%]',
  'mt-3 ml-[16%]',
  'mt-8 ml-[6%]',
  'mt-5 ml-[14%]',
  'mt-11 ml-[1%]',
];

export function GardenOfCare() {
  const { state, setView } = useGame();
  const unlocked = new Set(state.achievementsUnlocked);

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">Следы заботы</p>
      <h2 className="mt-3 font-display text-[1.85rem] text-forest sm:text-[2.4rem] md:text-[2.75rem]">
        Не награды. Память.
      </h2>
      <p className="mt-4 max-w-lg text-[1.05rem] leading-[1.7] text-ink/70">
        Здесь нет монет и уровней. Только то, что растение уже знает о тебе.
      </p>

      <div className="mt-8">
        {achievementDefs.map((item, i) => {
          const on = unlocked.has(item.id);
          return (
            <article
              key={item.id}
              className={`${places[i % places.length]} max-w-md border-l-2 py-4 pl-4 ${
                on ? 'border-leaf' : 'border-[#d7c9b0]'
              }`}
            >
              <h3 className={`font-display text-2xl ${on ? 'text-forest' : 'text-ink/30'}`}>
                {item.title}
              </h3>
              <p className={`mt-1 text-sm ${on ? 'text-ink/65' : 'text-ink/30'}`}>{item.line}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-clay">
                {on ? 'случилось' : 'ещё впереди'}
              </p>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setView('world')}
        className="mt-10 text-sm text-forest underline decoration-moss/40 underline-offset-4"
      >
        Вернуться к ростку
      </button>
    </div>
  );
}
