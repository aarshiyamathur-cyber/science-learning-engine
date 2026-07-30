import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { load } from "js-yaml";
import {
  AssessmentQuestionSchema,
  ConceptSchema,
  KnowledgeGraphSchema,
  LessonSchema,
} from "@aarshiya/curriculum-schema";

const CURRICULUM_ROOT = join(process.cwd(), "curriculum");

function loadYamlFiles(dir: string): { file: string; data: unknown }[] {
  const dirPath = join(CURRICULUM_ROOT, dir);
  return readdirSync(dirPath)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
    .map((file) => ({
      file: join(dir, file),
      data: load(readFileSync(join(dirPath, file), "utf-8")),
    }));
}

let errorCount = 0;

function report(file: string, error: string) {
  errorCount += 1;
  console.error(`✗ ${file}\n  ${error}`);
}

const concepts = loadYamlFiles("concepts");
const conceptIds = new Set<string>();

for (const { file, data } of concepts) {
  const result = ConceptSchema.safeParse(data);
  if (!result.success) {
    report(file, result.error.message);
    continue;
  }
  conceptIds.add(result.data.id);
}

for (const { file, data } of loadYamlFiles("lessons")) {
  const result = LessonSchema.safeParse(data);
  if (!result.success) {
    report(file, result.error.message);
    continue;
  }
  if (!conceptIds.has(result.data.conceptId)) {
    report(file, `references unknown conceptId "${result.data.conceptId}"`);
  }
}

for (const { file, data } of loadYamlFiles("assessments")) {
  const questions = Array.isArray(data) ? data : [data];
  for (const question of questions) {
    const result = AssessmentQuestionSchema.safeParse(question);
    if (!result.success) {
      report(file, result.error.message);
      continue;
    }
    if (!conceptIds.has(result.data.conceptId)) {
      report(file, `references unknown conceptId "${result.data.conceptId}"`);
    }
  }
}

for (const { file, data } of loadYamlFiles("graph")) {
  const result = KnowledgeGraphSchema.safeParse(data);
  if (!result.success) {
    report(file, result.error.message);
    continue;
  }
  for (const node of result.data.nodes) {
    if (!conceptIds.has(node)) {
      report(file, `graph node "${node}" is not a known concept id`);
    }
  }
  for (const edge of result.data.edges) {
    if (!conceptIds.has(edge.from)) {
      report(file, `edge references unknown concept id "${edge.from}"`);
    }
    if (!conceptIds.has(edge.to)) {
      report(file, `edge references unknown concept id "${edge.to}"`);
    }
  }
}

if (errorCount > 0) {
  console.error(`\n${errorCount} curriculum validation error(s) found.`);
  process.exit(1);
} else {
  console.log(`✓ Curriculum data valid (${conceptIds.size} concepts checked).`);
}
