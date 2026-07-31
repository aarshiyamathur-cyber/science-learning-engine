import path from "node:path";
import {
  loadCurriculumData,
  type LoadedCurriculum,
} from "@aarshiya/curriculum-schema/loader";

let cached: LoadedCurriculum | undefined;

/** Loads /curriculum once per server process. Content is static, git-tracked data. */
export function getCurriculum(): LoadedCurriculum {
  cached ??= loadCurriculumData(path.join(process.cwd(), "curriculum"));
  return cached;
}
