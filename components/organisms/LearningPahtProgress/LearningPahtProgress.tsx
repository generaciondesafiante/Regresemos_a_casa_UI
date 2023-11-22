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
  isSelected: boolean;
  onItemClick: () => void;
}
export const LearningPahtProgress: FC<LearningPathVideoClassProps> = ({
  course,
  lessonData,
  isSelected,
  onItemClick,
}) => {
  if (!course || !course.content) {
    return <div>No se encontraron datos para mostrar</div>;
  }

  return (
    <>
      {course.content.map((lesson, index) => (
        <div
          key={index}
          className={`${styles["classRoomRoute-subcontent"]} ${
            isSelected ? styles["selected"] : ""
          }`}
          onClick={() => onItemClick(index + 1)} // Pass the index to onItemClick
        >
          <div className={styles["classRoomRoute-title"]}>{index + 1}</div>

          <div className={styles["classRoomRoute-iconCircle"]}>{index + 1}</div>

          <div
            className={`${styles["classRoomRoute-line"]} ${
              index === course.content.length - 1 ? styles["hide"] : ""
            }`}
          ></div>
        </div>
      ))}
    </>
  );
};
