interface FormTextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

export default function FormTextarea({ id, label, placeholder, required, rows = 5, value, onChange, error }: FormTextareaProps) {
  return (
    <div className={`field-group ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={id} placeholder={placeholder} required={required} rows={rows} value={value} onChange={onChange} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} />
      {error && <p id={`${id}-err`} role="alert" className="field-error">{error}</p>}
    </div>
  );
}
