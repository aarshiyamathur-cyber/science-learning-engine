import type { CardStatus, ReleaseStatus, RoadmapStatus } from "./sample-data";

/**
 * Single source of truth for the status colour convention used across the
 * dashboard: green = good/done, amber = warning/in progress, gray = neutral/
 * not started.
 */
export const STATUS_COLORS: Record<CardStatus, { badge: string; accent: string }> = {
  good: {
    badge: "bg-emerald-100 text-emerald-800",
    accent: "border-emerald-500",
  },
  warning: {
    badge: "bg-amber-100 text-amber-800",
    accent: "border-amber-500",
  },
  neutral: {
    badge: "bg-slate-200 text-slate-700",
    accent: "border-slate-400",
  },
};

export function roadmapStatusToCardStatus(status: RoadmapStatus): CardStatus {
  switch (status) {
    case "Done":
      return "good";
    case "In progress":
      return "warning";
    case "Not started":
      return "neutral";
  }
}

export function releaseStatusToCardStatus(status: ReleaseStatus): CardStatus {
  switch (status) {
    case "Live":
      return "good";
    case "In progress":
      return "warning";
  }
}
