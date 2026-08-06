# Standard Workflows

All workflows use GitHub issues/roadmap links, a task branch, a draft PR, deterministic checks, and independent review. No step requires a particular AI vendor.

## 1. Feature development

Roadmap → scoped task and acceptance criteria → task branch → implementation → unit/integration tests → review script → QA/review → draft PR → approved merge.

## 2. Curriculum sprint

Product Owner approves scope → curriculum task → schema/reference validation → learner experience implementation only when authorized → curriculum validation and QA → draft PR → Product Owner/QA approval → merge. Curriculum changes must remain data-driven and separately reviewable.

## 3. Bug fix

Reproduction and severity → issue/task → regression test → minimal branch fix → review script → independent verification of the reproduction → draft PR → merge.

## 4. Graphics

Approved visual brief and licensing/source record → asset branch → optimise and test placement/responsiveness/alt text → visual QA → draft PR → merge. Do not make curriculum claims inside visual assets without approval.

## 5. Question bank

Learning objective and misconception mapping → question task → schema validation, answer/explanation review, difficulty and duplication check → QA sample → draft PR → Product Owner approval → merge.

## 6. Accessibility

Accessibility requirement or defect → task → implement semantic/keyboard/contrast/assistive-technology behaviour → automated tagged accessibility checks plus manual keyboard review → QA evidence in PR → merge.

## Common recovery path

If an agent or model fails, stop the worker, preserve its branch/worktree, record the failure in the task/PR, and hand the same task contract to another worker. Re-run deterministic review before continuing.
