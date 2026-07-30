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
});
export type Concept = z.infer<typeof ConceptSchema>;

export const LessonSchema = z.object({
  id: z.string().min(1),
  conceptId: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  content: z.string().min(1),
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
});
export type AssessmentQuestion = z.infer<typeof AssessmentQuestionSchema>;

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
