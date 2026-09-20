import { useState } from 'react';
import { teamMembers } from '../../data/team';
import type { TeamMember } from '../../types';

export function TeamGrove() {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">
        Люди мира
      </p>
      <h2 className="mt-3 max-w-2xl font-display text-[1.85rem] text-forest sm:text-[2.35rem] md:text-[2.7rem]">
        Мы растим маленький мир, о котором хочется заботиться.
      </h2>
      <p className="mt-5 max-w-xl text-[1.05rem] leading-[1.7] text-ink/70">
        Не отдел и не штатное расписание. Четверо из КГТУ, которые собрали эту поляну.
      </p>

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
    Boolean(member.role) || member.achievements.length > 0 || member.facts.length > 0;

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="group flex w-full items-center gap-4 rounded-[28px] p-2 text-left transition hover:bg-cream/80 sm:p-3"
    >
      <img
        src={member.photo}
        alt={member.name}
        className="h-16 w-16 shrink-0 rounded-[22px] object-cover ring-2 ring-paper sm:h-20 sm:w-20"
        style={{ objectPosition: member.photoPos }}
      />
      <div className="min-w-0 flex-1">
        <p className="font-display text-[1.35rem] text-forest sm:text-[1.65rem]">
          {first} <span className="text-moss">{rest.join(' ')}</span>
        </p>
        <p className="mt-1 text-sm font-medium tracking-wide text-ink/45">
          {member.university}
        </p>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] group-hover:grid-rows-[1fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-3 text-[0.95rem] leading-relaxed text-ink/70">
              {member.role && <p className="font-medium text-forest">{member.role}</p>}
              {member.achievements.map((line) => (
                <p key={line} className="mt-1">
                  {line}
                </p>
              ))}
              {member.facts.map((line) => (
                <p key={line} className="mt-1 text-earth">
                  {line}
                </p>
              ))}
              {!hasMeta && (
                <p className="text-ink/45">
                  Строки роли, достижений и фактов живут в data/team.ts — их легко дописать.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
