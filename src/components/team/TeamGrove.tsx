import { useState } from 'react';
import { teamMembers } from '../../data/team';
import type { TeamMember } from '../../types';

const palettes = [
  { hair: '#3d2a1c', skin: '#e8c7a8', shirt: '#3f7a4c' },
  { hair: '#6b3a2a', skin: '#f0d0b0', shirt: '#c4844a' },
  { hair: '#2b2420', skin: '#edcbb0', shirt: '#4e7c8a' },
  { hair: '#5a3b22', skin: '#e6c2a0', shirt: '#1e4a36' },
];

export function TeamGrove() {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-clay">Люди мира</p>
      <h2 className="font-display text-4xl leading-tight text-forest md:text-[3.2rem]">
        Мы растим маленький мир,
        <br />
        о котором хочется заботиться.
      </h2>
      <p className="mt-4 max-w-xl text-ink/65">
        Не отдел и не штатное расписание. Четверо из КГТУ, которые собрали эту поляну.
      </p>

      <div className="mt-10 space-y-3">
        {teamMembers.map((member, i) => (
          <MemberNote key={member.name} member={member} palette={palettes[i % palettes.length]} />
        ))}
      </div>
    </div>
  );
}

function MemberNote({
  member,
  palette,
}: {
  member: TeamMember;
  palette: (typeof palettes)[number];
}) {
  const [open, setOpen] = useState(false);
  const [first, ...rest] = member.name.split(' ');
  const hasMeta =
    Boolean(member.role) || member.achievements.length > 0 || member.facts.length > 0;

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="group flex w-full items-start gap-4 rounded-[28px] bg-transparent p-3 text-left transition hover:bg-cream/70"
    >
      <Portrait palette={palette} letter={first[0]} />
      <div className="min-w-0 flex-1 pt-1">
        <p className="font-display text-3xl leading-none text-forest sm:text-4xl">
          {first}{' '}
          <span className="text-moss">{rest.join(' ')}</span>
        </p>
        <p className="mt-2 text-sm text-ink/50">{member.university}</p>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] group-hover:grid-rows-[1fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-3 text-sm leading-relaxed text-ink/70">
              {member.role && <p className="text-forest">{member.role}</p>}
              {member.achievements.map((line) => (
                <p key={line} className="mt-1">
                  {line}
                </p>
              ))}
              {member.facts.map((line) => (
                <p key={line} className="mt-1 italic text-earth">
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

function Portrait({
  palette,
  letter,
}: {
  palette: (typeof palettes)[number];
  letter: string;
}) {
  return (
    <svg viewBox="0 0 72 72" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20">
      <circle cx="36" cy="36" r="34" fill="#f4eee3" />
      <circle cx="36" cy="40" r="18" fill={palette.skin} />
      <path d="M18 34c4-16 32-20 38-2-10-8-28-8-38 2Z" fill={palette.hair} />
      <path d="M22 58c8 10 20 10 28 0v6H22v-6Z" fill={palette.shirt} />
      <text x="36" y="46" textAnchor="middle" fontSize="14" fill="#1e4a36" fontFamily="Fraunces">
        {letter}
      </text>
    </svg>
  );
}
