interface SkillChipProps {
  label: string;
  className?: string;
}

export default function SkillChip({ label, className = "" }: SkillChipProps) {
  return (
    <span
      className={`skill-chip glass glass-interactive relative inline-block overflow-hidden rounded-full px-10 py-5 font-body font-bold text-base leading-none uppercase text-text-primary cursor-default ${className}`}
    >
      <span className="skill-chip-fill" aria-hidden="true" />
      <span className="relative z-10">{label}</span>
    </span>
  );
}
