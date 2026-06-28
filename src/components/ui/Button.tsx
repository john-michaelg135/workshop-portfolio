interface ButtonBaseProps {
  children: React.ReactNode;
  className?: string;
}

interface ButtonLinkProps extends ButtonBaseProps {
  variant: "primary" | "social";
  href: string;
  ariaLabel?: string;
}

interface ButtonSubmitProps extends ButtonBaseProps {
  variant: "submit";
  type?: "submit" | "button";
  disabled?: boolean;
}

type ButtonProps = ButtonLinkProps | ButtonSubmitProps;

export default function Button(props: ButtonProps) {
  const { variant, children, className = "" } = props;

  if (variant === "primary") {
    const { href } = props as ButtonLinkProps;
    return (
      <a
        href={href}
        className={`group inline-flex items-center gap-3 bg-accent text-text-on-accent font-body font-bold text-base leading-none uppercase rounded-full pl-6 pr-1.5 py-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:shadow-[0_12px_32px_-8px_var(--color-accent)] active:scale-95 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${className}`}
      >
        <span>{children}</span>
        <span className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-text-on-accent/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 10H15M15 10L10 5M15 10L10 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    );
  }

  if (variant === "submit") {
    const { type = "submit", disabled } = props as ButtonSubmitProps;
    return (
      <button
        type={type}
        disabled={disabled}
        className={`inline-flex items-center justify-center bg-accent text-text-on-accent font-body font-bold text-base leading-none uppercase rounded-full px-10 py-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:shadow-[0_12px_32px_-8px_var(--color-accent)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${className}`}
      >
        {children}
      </button>
    );
  }

  // social variant
  const { href, ariaLabel } = props as ButtonLinkProps;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`glass glass-interactive inline-flex items-center justify-center w-[54px] h-[54px] rounded-full ${className}`}
    >
      {children}
    </a>
  );
}
