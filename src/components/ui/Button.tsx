import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-orange text-white shadow-[0_6px_20px_rgba(255,106,19,0.35)] hover:bg-brand-orange-dark focus-visible:bg-brand-orange-dark",
  secondary: "bg-white text-brand-black hover:bg-brand-cream focus-visible:bg-brand-cream",
  outline: "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold tracking-wide transition-colors duration-150 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:opacity-50 disabled:cursor-not-allowed";

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  type,
  onClick,
  disabled,
}: {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
