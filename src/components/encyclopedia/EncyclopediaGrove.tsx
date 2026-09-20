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
    <div className="pb-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">Исследование</p>
      <h2 className="font-display text-[1.85rem] text-forest sm:text-[2.4rem] md:text-[2.85rem]">
        Мир можно читать,
        <br />
        касаясь его.
      </h2>
      <p className="mt-4 max-w-lg text-[1.05rem] leading-[1.7] text-ink/70">
        Не статьи. Тропы. Каждый шаг — факт, вопрос или жест, который возвращает к ростку.
      </p>

      <ol className="mt-8 space-y-1">
        {encyclopediaTopics.map((topic, i) => {
          const done = state.topicsCompleted.includes(topic.id);
          return (
            <li key={topic.id}>
              <button
                type="button"
                onClick={() => setActiveTopicId(topic.id)}
                className="group flex w-full items-baseline gap-4 rounded-2xl px-1 py-4 text-left transition hover:bg-cream/60"
              >
                <span className="w-8 font-display text-lg text-moss">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1">
                  <span className="block font-display text-3xl text-forest group-hover:translate-x-1 group-hover:transition">
                    {topic.title}
                  </span>
                  <span className="mt-1 block max-w-md text-sm text-ink/55">{topic.phrase}</span>
                </span>
                <span className="text-xs text-clay">{done ? 'пройдено' : 'открыть'}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
