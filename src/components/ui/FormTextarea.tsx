interface FormTextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export default function FormTextarea({
  id,
  label,
  placeholder,
  required = false,
  rows = 6,
  className = "",
}: FormTextareaProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={id}
        className="font-body font-medium text-base leading-[1.6] text-text-primary"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="glass rounded-xl px-4 py-3 font-body text-lg leading-[1.5] text-text-primary placeholder:text-text-secondary/60 outline-none resize-y min-h-[156px] transition-all duration-300 focus-visible:scale-[1.01] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-0"
      />
    </div>
  );
}
