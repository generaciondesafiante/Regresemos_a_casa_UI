import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "../../../store/store";
import { Course } from "../../../types/types/course.types";
import styles from "./LearningPathProgress.module.css";


interface LessonItemProps {
  selectedCourse: Course | null;
  index: number;
}

export const LessonItem: FC<LessonItemProps> = ({ index }) => {
  const router = useRouter();
  const { courseName, tema, courseId } = useParams();
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);

  const handleItemClick = (lessonIndex: number) => {
    if (selectedTopic) {
      let lessonId;
      const url = `/dashboard/courses/${courseName}/${courseId}/${lessonId}/${tema}/${lessonIndex}`;
      router.push(url);
    }
  };

  const isLessonUnlocked = true;

  return (
    <div
      key={index}
      className={`${styles["classRoomRoute-subcontent"]}`}
      onClick={() => {
        if (isLessonUnlocked) {
          handleItemClick(index + 1);
        }
      }}
    >
      <div className={`${styles["classRoomRoute-title"]} `}>{index + 1}</div>

      <div className={`${styles["classRoomRoute-iconCircle"]}`}>
        {index + 1}
      </div>

      <div
        className={`${styles["classRoomRoute-line"]} ${
          index === (selectedTopic?.resources.length ?? 0) - 1
            ? styles["hide"]
            : ""
        }`}
      ></div>
    </div>
  );
};
