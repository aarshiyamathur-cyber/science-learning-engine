import { z } from "zod";

/**
 * Curriculum data model.
 *
 * These schemas are the single source of truth for the shape of curriculum
 * data (concepts, lessons, assessments, and the knowledge graph that links
 * them). Curriculum content itself lives as YAML/JSON under /curriculum and
 * is validated against these schemas — never hardcoded into application code.
 */

export const RevisionStrategySchema = z.enum([
  "spaced-repetition",
  "interleaved-practice",
  "targeted-drill",
  "none",
]);
export type RevisionStrategy = z.infer<typeof RevisionStrategySchema>;

export const MisconceptionSchema = z.object({
  id: z.string(),
  description: z.string(),
  correction: z.string(),
});
export type Misconception = z.infer<typeof MisconceptionSchema>;

export const ConceptSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  learningObjectives: z.array(z.string()).min(1),
  misconceptions: z.array(MisconceptionSchema).default([]),
  prerequisites: z.array(z.string()).default([]),
  unlocks: z.array(z.string()).default([]),
  masteryThreshold: z.number().min(0).max(1),
  revisionStrategy: RevisionStrategySchema,
  lessonRefs: z.array(z.string()).default([]),
  assessmentRefs: z.array(z.string()).default([]),
  xpReward: z.number().min(0),
});
export type Concept = z.infer<typeof ConceptSchema>;

export const ExplanationStepSchema = z.object({
  type: z.literal("explanation"),
  body: z.string().min(1),
});

export const ExampleStepSchema = z.object({
  type: z.literal("example"),
  body: z.string().min(1),
});

export const QuestionStepSchema = z.object({
  type: z.literal("question"),
  questionId: z.string().min(1),
});

export const SummaryStepSchema = z.object({
  type: z.literal("summary"),
  body: z.string().min(1),
});

/**
 * References a reusable interactive widget by id (e.g. "particle-state-explorer").
 * The widget id isn't a closed enum here — widgets are registered and
 * dispatched in the UI layer (LessonPlayer), not the schema — so adding a
 * new widget never requires touching this package.
 */
export const InteractiveStepSchema = z.object({
  type: z.literal("interactive"),
  widget: z.string().min(1),
  prompt: z.string().min(1),
});

export const LessonStepSchema = z.discriminatedUnion("type", [
  ExplanationStepSchema,
  ExampleStepSchema,
  QuestionStepSchema,
  SummaryStepSchema,
  InteractiveStepSchema,
]);
export type LessonStep = z.infer<typeof LessonStepSchema>;

export const LessonSchema = z.object({
  id: z.string().min(1),
  conceptId: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  steps: z.array(LessonStepSchema).min(1),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const AssessmentQuestionSchema = z.object({
  id: z.string().min(1),
  conceptId: z.string().min(1),
  prompt: z.string().min(1),
  type: z.enum(["multiple-choice", "short-answer", "drag-and-drop", "matching"]),
  options: z.array(z.string()).optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  difficulty: z.number().min(0).max(1),
  explanation: z.string().min(1),
});
export type AssessmentQuestion = z.infer<typeof AssessmentQuestionSchema>;

export type ResolvedLessonStep =
  | ExplanationStep
  | ExampleStep
  | { type: "question"; question: AssessmentQuestion }
  | SummaryStep
  | InteractiveStep;
type ExplanationStep = z.infer<typeof ExplanationStepSchema>;
type ExampleStep = z.infer<typeof ExampleStepSchema>;
type SummaryStep = z.infer<typeof SummaryStepSchema>;
type InteractiveStep = z.infer<typeof InteractiveStepSchema>;

export class UnresolvedQuestionRefError extends Error {
  constructor(
    readonly lessonId: string,
    readonly questionId: string,
  ) {
    super(`Lesson "${lessonId}" references unknown question id "${questionId}"`);
    this.name = "UnresolvedQuestionRefError";
  }
}

/**
 * Resolves a Lesson's ordered steps into a form ready for rendering: each
 * "question" step's questionId is replaced with the full AssessmentQuestion
 * object, so a lesson player never needs to look up questions itself.
 */
export function resolveLessonSteps(
  lesson: Lesson,
  questionsById: ReadonlyMap<string, AssessmentQuestion>,
): ResolvedLessonStep[] {
  return lesson.steps.map((step) => {
    if (step.type !== "question") return step;
    const question = questionsById.get(step.questionId);
    if (!question) throw new UnresolvedQuestionRefError(lesson.id, step.questionId);
    return { type: "question", question };
  });
}

export const KnowledgeGraphEdgeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  relationship: z.enum(["prerequisite-of", "unlocks", "related-to"]),
});
export type KnowledgeGraphEdge = z.infer<typeof KnowledgeGraphEdgeSchema>;

export const KnowledgeGraphSchema = z.object({
  nodes: z.array(z.string()),
  edges: z.array(KnowledgeGraphEdgeSchema),
});
export type KnowledgeGraph = z.infer<typeof KnowledgeGraphSchema>;
