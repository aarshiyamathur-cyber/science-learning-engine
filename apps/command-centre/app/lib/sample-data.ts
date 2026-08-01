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

export interface SprintHistoryEntry {
  name: string;
  dateRange: string;
  status: RoadmapStatus;
  summary: string;
  openClawTasks: number;
  claudeTasks: number;
}

export type ReleaseStatus = "Live" | "In progress";

export interface ReleaseEntry {
  name: string;
  status: ReleaseStatus;
  description: string;
  urlNote: string;
}

export interface QuestionBankSummary {
  totalQuestions: number;
  multipleChoice: number;
  shortAnswer: number;
  conceptsCovered: number;
}

export interface ConceptQuestionBreakdown {
  concept: string;
  total: number;
  multipleChoice: number;
  shortAnswer: number;
}

export const sprintHistory: SprintHistoryEntry[] = [
  {
    name: "Sprint 2",
    dateRange: "2026-06-01 – 2026-06-12",
    status: "Done",
    summary: "Stood up the curriculum schema and shipped the first concept end-to-end.",
    openClawTasks: 0,
    claudeTasks: 6,
  },
  {
    name: "Sprint 3",
    dateRange: "2026-06-15 – 2026-06-26",
    status: "Done",
    summary: "Built the visual design system and applied it consistently across the lesson player.",
    openClawTasks: 1,
    claudeTasks: 5,
  },
  {
    name: "Sprint 4",
    dateRange: "2026-06-29 – 2026-07-10",
    status: "Done",
    summary: "Added interactive lesson widgets — the Particle State Explorer and Atom Builder.",
    openClawTasks: 1,
    claudeTasks: 2,
  },
  {
    name: "Sprint 5",
    dateRange: "2026-07-13 – present",
    status: "In progress",
    summary: "Completing the Matter topic: Particle Model and States of Matter lessons, new illustrations, and multi-lesson navigation.",
    openClawTasks: 3,
    claudeTasks: 2,
  },
];

export const releases: ReleaseEntry[] = [
  {
    name: "Matter topic — live demo",
    status: "Live",
    description: "The Matter concept lesson, quiz, and progress tracking run end-to-end for Aarshiya.",
    urlNote: "URL: internal only — not yet public",
  },
  {
    name: "Particle Model & States of Matter lessons",
    status: "In progress",
    description: "New lessons and illustrations built by OpenClaw, pending final QA before joining the live topic flow.",
    urlNote: "URL: not yet public",
  },
  {
    name: "Product Command Centre",
    status: "In progress",
    description: "This internal dashboard — navigation and initial pages shipped, still being built out page by page.",
    urlNote: "URL: not yet public",
  },
];

export const questionBankSummary: QuestionBankSummary = {
  totalQuestions: 15,
  multipleChoice: 9,
  shortAnswer: 6,
  conceptsCovered: 3,
};

export const conceptQuestionBreakdown: ConceptQuestionBreakdown[] = [
  { concept: "Matter", total: 5, multipleChoice: 3, shortAnswer: 2 },
  { concept: "Particle Model", total: 5, multipleChoice: 3, shortAnswer: 2 },
  { concept: "States of Matter", total: 5, multipleChoice: 3, shortAnswer: 2 },
];

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
