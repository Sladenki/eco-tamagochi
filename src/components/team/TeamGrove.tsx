import { useState } from 'react';
import { teamMembers } from '../../data/team';
import type { TeamMember } from '../../types';

export function TeamGrove() {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">
        Люди мира
      </p>
      <h2 className="mt-3 max-w-2xl break-words font-display text-[1.45rem] text-forest sm:text-[2.35rem] md:text-[2.7rem]">
        Мы растим маленький мир, о котором хочется заботиться.
      </h2>

      <div className="mt-12 space-y-3">
        {teamMembers.map((member) => (
          <MemberNote key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}

function MemberNote({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false);
  const [first, ...rest] = member.name.split(' ');
  const hasMeta =
    Boolean(member.role) ||
    member.tags.length > 0 ||
    member.achievements.length > 0 ||
    member.facts.length > 0;

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="group flex w-full items-start gap-4 rounded-[28px] p-2 text-left transition hover:bg-cream/80 sm:p-3"
    >
      <img
        src={member.photo}
        alt={member.name}
        loading="lazy"
        decoding="async"
        width={80}
        height={80}
        className="h-16 w-16 shrink-0 rounded-[22px] object-cover ring-2 ring-paper sm:h-20 sm:w-20"
        style={{ objectPosition: member.photoPos }}
      />
      <div className="min-w-0 flex-1">
        <p className="font-display text-[1.35rem] text-forest sm:text-[1.65rem]">
          {first} <span className="text-moss">{rest.join(' ')}</span>
        </p>
        <p className="mt-1 text-sm font-medium tracking-wide text-ink/45">
          {member.role ? `${member.role} · ${member.university}` : member.university}
        </p>
        {member.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {member.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
        <div
          className={`grid transition-[grid-template-rows] duration-300 ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-3">
              {member.facts.map((line) => (
                <p key={line} className="text-[0.95rem] leading-relaxed text-ink/70">
                  {line}
                </p>
              ))}
              {member.achievements.length > 0 && (
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {member.achievements.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[22px] bg-cream px-3.5 py-3 ring-1 ring-forest/6"
                    >
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <Tag key={tag} quiet>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                      <p className="mt-2.5 font-display text-[1.05rem] leading-tight text-forest">
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ink/60">
                        {item.line}
                      </p>
                    </article>
                  ))}
                </div>
              )}
              {!hasMeta && (
                <p className="text-[0.95rem] text-ink/45">Жду инфы, котята</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function Tag({
  children,
  quiet = false,
}: {
  children: string;
  quiet?: boolean;
}) {
  const win = /победитель/i.test(children);
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${
        win
          ? 'bg-forest text-paper'
          : quiet
            ? 'bg-paper text-earth'
            : 'bg-forest/8 text-forest ring-1 ring-forest/10'
      }`}
    >
      {children}
    </span>
  );
}
