import { useState } from 'react';
import type { EncyclopediaTopic } from '../../types';
import { useGame } from '../../hooks/useGame';
import { TopicVisual } from './TopicVisual';

export function TopicWalk({
  topic,
  onBack,
}: {
  topic: EncyclopediaTopic;
  onBack: () => void;
}) {
  const game = useGame();
  const saved = game.state.topicStep[topic.id] ?? 0;
  const [stepIndex, setStepIndex] = useState(Math.min(saved, topic.steps.length - 1));
  const step = topic.steps[stepIndex];
  const last = stepIndex === topic.steps.length - 1;

  const goNext = () => {
    game.learnFact(step.id);
    if (last) {
      game.completeTopic(topic.id);
      onBack();
      return;
    }
    const next = stepIndex + 1;
    setStepIndex(next);
    game.setTopicStep(topic.id, next);
  };

  return (
    <div className="flex min-h-full flex-col">
      <button
        type="button"
        onClick={onBack}
        className="self-start text-sm text-forest/70"
      >
        ← все тропы
      </button>
      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-clay">{topic.title}</p>

      {step.type === 'fact' && (
        <>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-moss">{step.kicker}</p>
          <h2 className="mt-2 font-display text-3xl text-forest md:text-4xl">{step.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/75">{step.body}</p>
        </>
      )}

      {step.type === 'visual' && (
        <>
          <h2 className="mt-2 font-display text-3xl text-forest md:text-4xl">{step.title}</h2>
          <p className="mt-3 max-w-xl text-ink/70">{step.body}</p>
          <TopicVisual kind={step.visual} />
        </>
      )}

      {step.type === 'question' && <QuestionStep step={step} onSolved={goNext} />}

      {step.type === 'bridge' && (
        <>
          <h2 className="mt-2 font-display text-3xl text-forest md:text-4xl">{step.title}</h2>
          <p className="mt-4 max-w-xl text-ink/70">{step.body}</p>
          <button
            type="button"
            onClick={() => {
              game.learnFact(step.id);
              game.completeTopic(topic.id);
              if (step.go === 'water') {
                game.setView('world');
                game.setActiveTopicId(null);
                game.waterPlant();
                return;
              }
              if (step.go === 'games') {
                game.setView('games');
                game.setActiveTopicId(null);
                return;
              }
              game.setView('world');
              game.setActiveTopicId(null);
            }}
            className="mt-8 self-start rounded-full bg-forest px-5 py-3 text-sm text-paper"
          >
            {step.cta}
          </button>
        </>
      )}

      {step.type !== 'question' && step.type !== 'bridge' && (
        <button
          type="button"
          onClick={goNext}
          className="mt-8 self-start rounded-full bg-forest px-5 py-3 text-sm text-paper"
        >
          {last ? 'Сохранить тропу' : 'Дальше'}
        </button>
      )}
    </div>
  );
}

function QuestionStep({
  step,
  onSolved,
}: {
  step: Extract<EncyclopediaTopic['steps'][number], { type: 'question' }>;
  onSolved: () => void;
}) {
  const [hint, setHint] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  return (
    <>
      <h2 className="mt-2 font-display text-3xl text-forest md:text-4xl">{step.question}</h2>
      <div className="mt-6 space-y-2">
        {step.options.map((option) => (
          <button
            key={option.id}
            type="button"
            disabled={solved && !option.correct}
            onClick={() => {
              setHint(option.hint);
              if (option.correct) setSolved(true);
            }}
            className="block w-full rounded-2xl bg-cream px-4 py-3 text-left text-sm text-ink/80 hover:bg-[#efe6d4] disabled:opacity-40"
          >
            {option.text}
          </button>
        ))}
      </div>
      {hint && <p className="mt-4 text-sm text-earth">{hint}</p>}
      {solved && (
        <button
          type="button"
          onClick={onSolved}
          className="mt-6 self-start rounded-full bg-forest px-5 py-3 text-sm text-paper"
        >
          Дальше
        </button>
      )}
    </>
  );
}
