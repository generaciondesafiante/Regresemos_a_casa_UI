"use client";
import { FC } from "react";
import { Button } from "../../../atoms";
import { AssessmentFinishedProps } from "../../../../types/types/assessment.type";
import styles from "./AssessmentFinished.module.css";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../../../store/store";

export const AssessmentFinished: FC<AssessmentFinishedProps> = ({
  score,
  questions,
  onRestartAssessment,
}) => {
  let imageFinished = "https://i.imgur.com/V8pdd6P.png";
  const router = useRouter(); // Inicializa el hook useHistory
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  const selectedLesson = useAppSelector(
    (state) => state.lessons.selectedLesson
  );
  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );

  console.log(selectedLesson);

  const getNextLesson = () => {
    if (!selectedTopic || !selectedTopic.lessons) return null; // Verifica si selectedTopic o selectedTopic.lessons es null o undefined

    const currentLessonIndex = selectedTopic.lessons.findIndex(
      (lesson) => lesson._id === selectedLesson?._id
    ); // Encuentra el índice de la lección actual

    // Verifica si currentLessonIndex es -1 (no se encontró la lección actual)
    if (currentLessonIndex === -1) return null;

    const nextLessonIndex = currentLessonIndex + 1; // Calcula el índice de la siguiente lección

    // Verifica si el índice de la siguiente lección está dentro del rango del arreglo de lecciones
    if (nextLessonIndex < selectedTopic.lessons.length) {
      return selectedTopic.lessons[nextLessonIndex]; // Retorna la siguiente lección
    } else {
      return null; // Si no hay más lecciones, retorna null
    }
  };

  const handleContinue = () => {
    const nextLesson = getNextLesson();
    console.log(selectedCourse?.courseName);

    if (nextLesson) {
      console.log("epa");

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
