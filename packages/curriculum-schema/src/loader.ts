import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { load } from "js-yaml";
import {
  AssessmentQuestionSchema,
  ConceptSchema,
  LessonSchema,
  type AssessmentQuestion,
  type Concept,
  type Lesson,
} from "./index";

/**
 * Runtime loader for curriculum YAML content, shared by the app and the
 * validation script (scripts/validate-curriculum.ts) so YAML-reading logic
 * exists in exactly one place. Assumes content has already passed
 * `npm run validate:curriculum` — cross-reference checks live there, not here.
 */

export interface LoadedCurriculum {
  concepts: Map<string, Concept>;
  lessons: Map<string, Lesson>;
  questions: Map<string, AssessmentQuestion>;
}

export class CurriculumLoadError extends Error {
  constructor(
    readonly file: string,
    message: string,
  ) {
    super(`${file}: ${message}`);
    this.name = "CurriculumLoadError";
  }
}

function readYamlDir(dirPath: string): { file: string; data: unknown }[] {
  return readdirSync(dirPath)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
    .map((file) => ({ file, data: load(readFileSync(join(dirPath, file), "utf-8")) }));
}

export function loadCurriculumData(curriculumRoot: string): LoadedCurriculum {
  const concepts = new Map<string, Concept>();
  for (const { file, data } of readYamlDir(join(curriculumRoot, "concepts"))) {
    const result = ConceptSchema.safeParse(data);
    if (!result.success) throw new CurriculumLoadError(file, result.error.message);
    concepts.set(result.data.id, result.data);
  }

  const questions = new Map<string, AssessmentQuestion>();
  for (const { file, data } of readYamlDir(join(curriculumRoot, "assessments"))) {
    const items = Array.isArray(data) ? data : [data];
    for (const item of items) {
      const result = AssessmentQuestionSchema.safeParse(item);
      if (!result.success) throw new CurriculumLoadError(file, result.error.message);
      questions.set(result.data.id, result.data);
    }
  }

  const lessons = new Map<string, Lesson>();
  for (const { file, data } of readYamlDir(join(curriculumRoot, "lessons"))) {
    const result = LessonSchema.safeParse(data);
    if (!result.success) throw new CurriculumLoadError(file, result.error.message);
    lessons.set(result.data.id, result.data);
  }

  return { concepts, lessons, questions };
}
