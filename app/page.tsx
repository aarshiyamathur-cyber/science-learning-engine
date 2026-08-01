import { resolveLessonSteps } from "@aarshiya/curriculum-schema";
import { ContinueLearningScreen } from "./components/ContinueLearningScreen";
import { getCurriculum } from "./lib/curriculum";
import { DEMO_LEARNER_ID, getOrCreateProfile, getProgressStore } from "./lib/progress";

// Reads mutable learner progress on every request — must not be statically
// prerendered, or every visitor would see whatever state existed at build time.
export const dynamic = "force-dynamic";

const DEMO_CONCEPT_ID = "sci-y7-matter";
const DEMO_LESSON_ID = "lesson-matter-intro";

export default function Home() {
  const { concepts, lessons, questions } = getCurriculum();
  const concept = concepts.get(DEMO_CONCEPT_ID);
  const lesson = lessons.get(DEMO_LESSON_ID);
  if (!concept || !lesson) {
    throw new Error(
      `Demo content missing: expected concept "${DEMO_CONCEPT_ID}" and lesson "${DEMO_LESSON_ID}"`,
    );
  }

  const steps = resolveLessonSteps(lesson, questions);
  const profile = getOrCreateProfile(DEMO_LEARNER_ID);
  const mastery = getProgressStore().getMasteryState(DEMO_LEARNER_ID, DEMO_CONCEPT_ID);

  return (
    <div className="flex flex-1 flex-col font-sans">
      <ContinueLearningScreen
        conceptId={concept.id}
        conceptTitle={concept.title}
        lessonId={lesson.id}
        lessonTitle={lesson.title}
        steps={steps}
        initialXp={profile.xp}
        initialMasteryScore={mastery?.masteryScore ?? 0}
        alreadyCompleted={profile.completedLessons.includes(lesson.id)}
      />
    </div>
  );
}
