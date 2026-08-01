/**
 * Shared semantic tones for the ui primitives (BL-020). Every primitive
 * picks a role — never a raw Tailwind hue — so the palette can change in
 * one place (app/globals.css) without touching component code.
 */
export type Tone =
  "brand" | "accent" | "success" | "warning" | "danger" | "info" | "neutral";

interface ToneClasses {
  badge: string;
  card: string;
  solidButton: string;
}

export const TONE_CLASSES: Record<Tone, ToneClasses> = {
  brand: {
    badge: "bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200",
    card: "border-brand-200 bg-white/80 dark:border-brand-900 dark:bg-zinc-900/80",
    solidButton: "bg-brand-600 hover:bg-brand-700 text-white",
  },
  accent: {
    badge: "bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200",
    card: "border-accent-200 bg-white/80 dark:border-accent-900 dark:bg-zinc-900/80",
    solidButton: "bg-accent-600 hover:bg-accent-700 text-white",
  },
  success: {
    badge: "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200",
    card: "border-success-200 bg-white/80 dark:border-success-900 dark:bg-zinc-900/80",
    solidButton: "bg-success-600 hover:bg-success-700 text-white",
  },
  warning: {
    badge: "bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200",
    card: "border-warning-200 bg-white/80 dark:border-warning-900 dark:bg-zinc-900/80",
    solidButton: "bg-warning-600 hover:bg-warning-700 text-white",
  },
  danger: {
    badge: "bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-200",
    card: "border-danger-200 bg-white/80 dark:border-danger-900 dark:bg-zinc-900/80",
    solidButton: "bg-danger-600 hover:bg-danger-700 text-white",
  },
  info: {
    badge: "bg-info-100 text-info-800 dark:bg-info-900 dark:text-info-200",
    card: "border-info-200 bg-white/80 dark:border-info-900 dark:bg-zinc-900/80",
    solidButton: "bg-info-600 hover:bg-info-700 text-white",
  },
  neutral: {
    badge: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
    card: "border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-900/80",
    solidButton: "bg-zinc-700 hover:bg-zinc-800 text-white",
  },
};
