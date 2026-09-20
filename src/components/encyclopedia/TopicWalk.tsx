import { ArrowLeft } from 'lucide-react';
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
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-2 text-sm font-medium text-forest"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Тропы
        </button>
        <div className="flex gap-1.5">
          {topic.steps.map((item, i) => (
            <span
              key={item.id}
              className={`h-1.5 w-4 rounded-full ${
                i < stepIndex ? 'bg-leaf' : i === stepIndex ? 'bg-forest' : 'bg-[#ddd2bd]'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-6 text-[13px] font-semibold text-clay">{topic.title}</p>

      {step.type === 'fact' && (
        <>
          <span className="mt-3 inline-flex self-start rounded-full bg-cream px-3 py-1 text-[12px] font-medium text-leaf">
            {step.kicker}
          </span>
          <h2 className="mt-3 max-w-xl font-display text-[1.75rem] text-forest md:text-[2.1rem]">
            {step.title}
          </h2>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-[1.7] text-ink/70">{step.body}</p>
        </>
      )}

      {step.type === 'visual' && (
        <>
          <h2 className="mt-3 max-w-xl font-display text-[1.75rem] text-forest md:text-[2.1rem]">
            {step.title}
          </h2>
          <p className="mt-3 max-w-xl text-[1.05rem] leading-[1.7] text-ink/70">{step.body}</p>
          <TopicVisual kind={step.visual} />
        </>
      )}

      {step.type === 'question' && <QuestionStep step={step} onSolved={goNext} />}

      {step.type === 'bridge' && (
        <>
          <h2 className="mt-3 max-w-xl font-display text-[1.75rem] text-forest md:text-[2.1rem]">
            {step.title}
          </h2>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-[1.7] text-ink/70">{step.body}</p>
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
            className="mt-8 self-start rounded-full bg-forest px-5 py-3.5 text-sm font-medium text-paper"
          >
            {step.cta}
          </button>
        </>
      )}

      {step.type !== 'question' && step.type !== 'bridge' && (
        <button
          type="button"
          onClick={goNext}
          className="mt-8 self-start rounded-full bg-forest px-5 py-3.5 text-sm font-medium text-paper"
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
  const [picked, setPicked] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  return (
    <>
      <h2 className="mt-3 max-w-xl font-display text-[1.75rem] text-forest md:text-[2.1rem]">
        {step.question}
      </h2>
      <div className="mt-6 space-y-2">
        {step.options.map((option) => {
          const selected = picked === option.id;
          return (
            <button
              key={option.id}
              type="button"
              disabled={solved && !option.correct}
              onClick={() => {
                setPicked(option.id);
                setHint(option.hint);
                if (option.correct) setSolved(true);
              }}
              className={`block w-full rounded-2xl px-4 py-3.5 text-left text-sm leading-relaxed transition ${
                solved && option.correct
                  ? 'bg-leaf/15 text-forest ring-1 ring-leaf/40'
                  : selected
                    ? 'bg-[#efe6d4] text-ink'
                    : 'bg-cream text-ink/80 hover:bg-[#efe6d4]'
              } disabled:opacity-40`}
            >
              {option.text}
            </button>
          );
        })}
      </div>
      {hint && <p className="mt-4 text-sm leading-relaxed text-earth">{hint}</p>}
      {solved && (
        <button
          type="button"
          onClick={onSolved}
          className="mt-6 self-start rounded-full bg-forest px-5 py-3.5 text-sm font-medium text-paper"
        >
          Дальше
        </button>
      )}
    </>
  );
}
