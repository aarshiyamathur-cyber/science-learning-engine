/**
 * Sample data for the Executive Dashboard and Roadmap pages.
 *
 * This is placeholder data shaped like what a future "repository reader" data
 * layer (reading git history, management/*.md, the backlog, etc.) would produce.
 * Swapping in a real data source later means replacing the exported consts
 * below with values computed from that layer — the pages themselves only
 * depend on these types.
 */

export type CardStatus = "good" | "warning" | "neutral";

export interface ProgramStatus {
  initiativeName: string;
  statusSummary: string;
}

export interface ProgressMetric {
  label: string;
  value: string | number;
  status: CardStatus;
}

export interface Blocker {
  title: string;
  detail: string;
}

export type RoadmapStatus = "Done" | "In progress" | "Not started";

export interface RoadmapItem {
  title: string;
  status: RoadmapStatus;
  description: string;
}

export const programStatus: ProgramStatus = {
  initiativeName: "Sprint 5 — Complete the Matter topic",
  statusSummary: "On track: content and interactivity done, final QA and visual polish remaining.",
};

export const progressMetrics: ProgressMetric[] = [
  { label: "Automation Ratio", value: "82%", status: "good" },
  { label: "Tasks Completed", value: 24, status: "good" },
  { label: "Tasks In Progress", value: 3, status: "warning" },
  { label: "Open Blockers", value: 0, status: "neutral" },
];

export const blockers: Blocker[] = [];

export const roadmapItems: RoadmapItem[] = [
  {
    title: "Sprint 2 — First playable learning loop",
    status: "Done",
    description: "Stood up the curriculum schema and shipped a single concept end-to-end.",
  },
  {
    title: "Sprint 3 — Visual polish",
    status: "Done",
    description: "Applied consistent typography, spacing, and colour across the lesson player.",
  },
  {
    title: "Sprint 4 — Interactive widgets",
    status: "Done",
    description: "Added interactive diagrams and quiz components to lessons.",
  },
  {
    title: "Sprint 5 — Complete the Matter topic",
    status: "In progress",
    description: "Writing the remaining Matter lessons and assessments, then a full QA pass.",
  },
  {
    title: "Product Command Centre",
    status: "In progress",
    description: "Scaffolding an internal dashboard to track sprints, releases, and engineering health.",
  },
];
