import { encyclopediaTopics } from '../../data/encyclopedia';
import { useGame } from '../../hooks/useGame';
import { TopicWalk } from './TopicWalk';

export function EncyclopediaGrove() {
  const { state, activeTopicId, setActiveTopicId } = useGame();

  if (activeTopicId) {
    const topic = encyclopediaTopics.find((item) => item.id === activeTopicId);
    if (topic) {
      return <TopicWalk topic={topic} onBack={() => setActiveTopicId(null)} />;
    }
  }

  return (
    <div className="min-w-0 pb-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">
        Исследование
      </p>
      <h2 className="mt-2 break-words font-display text-[1.45rem] text-forest sm:text-[2.4rem] md:text-[2.85rem]">
        Мир можно читать, касаясь его.
      </h2>
      <p className="mt-4 max-w-lg text-[0.95rem] leading-[1.65] text-ink/70 sm:text-[1.05rem] sm:leading-[1.7]">
        Не статьи. Тропы. Каждый шаг — факт, вопрос или жест, который возвращает к ростку.
      </p>

      <ol className="mt-8 space-y-1">
        {encyclopediaTopics.map((topic, i) => {
          const done = state.topicsCompleted.includes(topic.id);
          return (
            <li key={topic.id} className="min-w-0">
              <button
                type="button"
                onClick={() => setActiveTopicId(topic.id)}
                className="group flex w-full min-w-0 items-start gap-3 rounded-2xl px-1 py-3 text-left transition hover:bg-cream/60 sm:items-baseline sm:gap-4 sm:py-4"
              >
                <span className="w-7 shrink-0 font-display text-base text-moss sm:w-8 sm:text-lg">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-words font-display text-[1.35rem] text-forest sm:text-3xl">
                    {topic.title}
                  </span>
                  <span className="mt-1 block text-sm text-ink/55">{topic.phrase}</span>
                </span>
                <span className="hidden shrink-0 pt-1 text-xs text-clay sm:inline">
                  {done ? 'пройдено' : 'открыть'}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
