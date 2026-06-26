interface SkillChipProps {
  label: string;
  className?: string;
}

export default function SkillChip({ label, className = "" }: SkillChipProps) {
  return (
    <span
      className={`inline-block border border-border rounded-full px-10 py-5 font-body font-bold text-base leading-none uppercase text-text-primary ${className}`}
    >
      {label}
    </span>
  );
}
