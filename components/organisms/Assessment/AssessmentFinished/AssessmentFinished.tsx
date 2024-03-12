import { FC } from "react";
import { Button } from "../../../atoms";
// import { AssessmentFinishedProps } from "../../../../types/types/assessment.type";
import styles from "./AssessmentFinished.module.css";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../../../store/store";
import { AssessmentLesson } from "../../../../types/types/lessons.type";
interface AssessmentFinishedProps {
  score: number;
  questions: AssessmentLesson[] | undefined;
  onRestartAssessment: () => void;
}
export const AssessmentFinished: FC<AssessmentFinishedProps> = ({
  score,
  questions,
  onRestartAssessment,
}) => {
  console.log(questions);
  let imageFinished = "https://i.imgur.com/V8pdd6P.png";
  const router = useRouter();
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );
  const selectedLesson = useAppSelector(
    (state) => state.lessons.selectedLesson
  );

  const getNextLesson = () => {
    if (!selectedTopic || !selectedTopic.lessons) return null;

    const currentLessonIndex = selectedTopic.lessons.findIndex(
      (lesson: any) => lesson._id === selectedLesson?._id
    );
    if (currentLessonIndex === -1) return null;

    const nextLessonIndex = currentLessonIndex + 1;

    if (nextLessonIndex < selectedTopic.lessons.length) {
      return selectedTopic.lessons[nextLessonIndex];
    } else {
      return null;
    }
  };

  const handleContinue = () => {
    const nextLesson = getNextLesson();

    if (nextLesson) {
      router.push(
        `/dashboard/courses/${selectedCourse?.courseName}/${selectedCourse?._id}/${nextLesson?.videoId}/${selectedTopic?.topicName}/${nextLesson.sequentialLesson}`
      );
    } else {
      console.log("No hay más lecciones disponibles");
    }
  };

  return (
    <div className={styles["assessment-finished_container"]}>
      <div className={styles["assessment-imageContainer"]}>
        <img
          src={imageFinished}
          alt="students"
          className={styles["assessment-image"]}
        />
      </div>
      <p
        className={styles["assessment-result"]}
      >{`Son ${score} de ${questions?.length} preguntas correctas`}</p>
      <section className={styles["assessment-buttonContainer"]}>
        <Button
          className={styles["assessment-button"]}
          onClick={onRestartAssessment}
        >
          Intentar de nuevo
        </Button>
        <Button className={styles["assessment-button"]}>
          Repasar la lección
        </Button>
        <Button
          className={styles["assessment-button"]}
          onClick={handleContinue}
        >
          Continuar
        </Button>
      </section>
    </div>
  );
};
