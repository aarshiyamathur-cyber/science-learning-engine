import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { load } from "js-yaml";
import { TaskSchema, type Task } from "./index";

/**
 * Runtime loader for task YAML content under management/tasks/, shared by
 * the validation script and anything that needs to read tasks (e.g. a
 * future Command Centre data layer, or the Markdown-view generator).
 */

export interface LoadedTasks {
  tasks: Map<string, Task>;
}

export class TaskLoadError extends Error {
  constructor(
    readonly file: string,
    message: string,
  ) {
    super(`${file}: ${message}`);
    this.name = "TaskLoadError";
  }
}

export function loadTaskData(tasksRoot: string): LoadedTasks {
  const tasks = new Map<string, Task>();

  const files = readdirSync(tasksRoot).filter(
    (file) => file.endsWith(".yaml") || file.endsWith(".yml"),
  );

  for (const file of files) {
    const data = load(readFileSync(join(tasksRoot, file), "utf-8"));
    const result = TaskSchema.safeParse(data);
    if (!result.success) throw new TaskLoadError(file, result.error.message);
    tasks.set(result.data.id, result.data);
  }

  return { tasks };
}
