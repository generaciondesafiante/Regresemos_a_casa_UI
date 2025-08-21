"use client";
import { FC } from "react";
import  Button  from "@/shared/components/Button/Button";
import styles from "./AssessmentFinished.module.css";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../../../store/store";
import { AssessmentLesson } from "../../../../types/types/lessons.type";
import Swal from "sweetalert2";
interface AssessmentFinishedProps {
  score?: number;
  questions?: AssessmentLesson[] | undefined;
  onRestartAssessment?: () => void;
}
export const AssessmentFinished: FC<AssessmentFinishedProps> = ({
  score,
  questions,
  onRestartAssessment,
}) => {
  let imageFinished = "https://i.imgur.com/V8pdd6P.png";
  const router = useRouter();
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );
  const selectedResource = useAppSelector(
    (state) => state.resource.selectedResource
  );
  const getNextLesson = () => {
    if (!selectedTopic || !selectedTopic.resources) return null;

    const currentLessonIndex = selectedTopic.resources.findIndex(
      (lesson: any) => lesson._id === selectedResource?._id
    );
    if (currentLessonIndex === -1) return null;

    const nextLessonIndex = currentLessonIndex + 1;

    if (nextLessonIndex < selectedTopic.resources.length) {
      return selectedTopic.resources[nextLessonIndex];
    } else {
      return null;
    }
  };

  const handleContinue = () => {
    const nextLesson = getNextLesson();

    if (nextLesson) {
      router.push("/dashboard");
    } else {
      Swal.fire("Error", "No hay más lecciones disponibles.", "error");
      return;
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
