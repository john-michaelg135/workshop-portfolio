interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function FormInput({ id, label, type = "text", placeholder, required, value, onChange, error }: FormInputProps) {
  return (
    <div className={`field-group ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} placeholder={placeholder} required={required} value={value} onChange={onChange} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} />
      {error && <p id={`${id}-err`} role="alert" className="field-error">{error}</p>}
    </div>
  );
}
