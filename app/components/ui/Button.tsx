import type { ButtonHTMLAttributes } from "react";
import { TONE_CLASSES, type Tone } from "./tone";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** "primary" is the one big call-to-action per screen; "solid" is for secondary actions. */
  variant?: "primary" | "solid";
  tone?: Tone;
}

export function Button({
  variant = "primary",
  tone = "brand",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-brand-500 to-info-500 px-6 py-3 text-body text-white hover:scale-105"
      : `px-5 py-2 text-label ${TONE_CLASSES[tone].solidButton}`;

  return (
    <button
      type="button"
      className={`self-start rounded-full font-bold shadow-sm transition-transform disabled:opacity-40 disabled:hover:scale-100 ${variantClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
