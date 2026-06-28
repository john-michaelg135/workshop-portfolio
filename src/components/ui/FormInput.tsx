interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  className = "",
}: FormInputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={id}
        className="font-body font-medium text-base leading-[1.6] text-text-primary"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="glass rounded-xl px-4 py-3 font-body text-lg leading-[1.5] text-text-primary placeholder:text-text-secondary/60 outline-none transition-all duration-300 focus-visible:scale-[1.01] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-0"
      />
    </div>
  );
}
