import { FC } from "react";
import { Course } from "..";
import styles from "./LearningPahtProgress.module.css";

interface LearningPathVideoClassProps {
  course: Course | null;
  lessonData: {
    title: string;
    description: string;
    url: string;
    idVideo: number;
    isLastLesson: boolean;
  } | null;
}
export const LearningPahtProgress: FC<LearningPathVideoClassProps> = ({
  course,
  lessonData,
}) => {
  if (!course) {
    return <div>No se encontraron datos para mostrar</div>;
  }
  console.log(lessonData);

  return (
    <>
      <div className={styles["classRoomRoute-subcontent"]}>
        <div className={styles["classRoomRoute-title"]}>
          {lessonData.idVideo}
        </div>

        <div className={styles["classRoomRoute-iconCircle"]}>
          {lessonData.idVideo}
        </div>

        <div
          className={`${styles["classRoomRoute-line"]} ${
            lessonData.isLastLesson ? styles["hide"] : ""
          }`}
        ></div>
      </div>
    </>
  );
};
