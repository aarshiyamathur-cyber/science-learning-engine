import { cookies } from "next/headers";
import { resolveLessonSteps, type Concept } from "@aarshiya/curriculum-schema";
import { ContinueLearningScreen, type LessonEntry } from "./components/ContinueLearningScreen";
import { getCurriculum } from "./lib/curriculum";
import {
  ACTIVE_LEARNER_COOKIE,
  DEMO_LEARNER_ID,
  getOrCreateProfile,
  getProgressStore,
} from "./lib/progress";

// Reads mutable learner progress on every request — must not be statically
// prerendered, or every visitor would see whatever state existed at build time.
export const dynamic = "force-dynamic";

/**
 * The full science course so far, in teaching order across topics (Matter,
 * then Atomic Structure, ...). A concept is only shown once it has real
 * lesson content (lessonRefs populated) — this is how a concept that hasn't
 * been authored yet (e.g. before its lesson lands) simply doesn't appear,
 * with no placeholder needed.
 */
const SCIENCE_TOPIC_CONCEPT_IDS = [
  "sci-y7-matter",
  "sci-y7-particle-model",
  "sci-y7-states-of-matter",
  "sci-y7-atomic-structure",
  "sci-y7-periodic-table",
  "sci-y7-chemical-reactions",
  "sci-y7-forces",
  "sci-y7-energy",
  "sci-y7-cells",
  "sci-y7-body-systems",
  "sci-y7-ecosystems",
  "sci-y7-genetics-reproduction",
];

function isConceptCompleted(concept: Concept, completedLessons: string[]): boolean {
  return (
    concept.lessonRefs.length > 0 &&
    concept.lessonRefs.every((id) => completedLessons.includes(id))
  );
}

function isConceptLocked(
  concept: Concept,
  allConcepts: ReadonlyMap<string, Concept>,
  completedLessons: string[],
): boolean {
  return concept.prerequisites.some((prereqId) => {
    const prereq = allConcepts.get(prereqId);
    return prereq ? !isConceptCompleted(prereq, completedLessons) : false;
  });
}

export default async function Home() {
  const cookieStore = await cookies();
  const learnerId = cookieStore.get(ACTIVE_LEARNER_COOKIE)?.value ?? DEMO_LEARNER_ID;

  const { concepts, lessons, questions } = getCurriculum();
  const progressStore = getProgressStore();
  const profile = getOrCreateProfile(learnerId);
  const otherLearnerNames = progressStore
    .listProfiles()
    .map((p) => p.displayName)
    .filter((name) => name !== profile.displayName);

  const lessonEntries: LessonEntry[] = SCIENCE_TOPIC_CONCEPT_IDS.flatMap((conceptId) => {
    const concept = concepts.get(conceptId);
    if (!concept || concept.lessonRefs.length === 0) return [];

    const lesson = lessons.get(concept.lessonRefs[0]);
    if (!lesson) return [];

    const mastery = progressStore.getMasteryState(learnerId, conceptId);
    return [
      {
        conceptId: concept.id,
        conceptTitle: concept.title,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        steps: resolveLessonSteps(lesson, questions),
        initialMasteryScore: mastery?.masteryScore ?? 0,
        alreadyCompleted: profile.completedLessons.includes(lesson.id),
        locked: isConceptLocked(concept, concepts, profile.completedLessons),
      },
    ];
  });

  return (
    <div className="flex flex-1 flex-col font-sans">
      <ContinueLearningScreen
        // Forces a full remount (discarding any stale client-side XP/mastery
        // state) whenever the active learner changes or their progress is
        // reset — but not on a normal lesson completion, since resetAt only
        // changes via resetProfile(), never via completeLessonAction.
        key={`${learnerId}:${profile.resetAt ?? "never-reset"}`}
        lessons={lessonEntries}
        initialXp={profile.xp}
        learnerDisplayName={profile.displayName}
        otherLearnerNames={otherLearnerNames}
      />
    </div>
  );
}
