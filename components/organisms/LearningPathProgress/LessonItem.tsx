import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "../../../store/store";
import {
  VideoLesson,
  AssessmentLesson,
} from "../../../types/types/lessons.type";
import { Course } from "../../../types/types/course.types";
import styles from "./LearningPathProgress.module.css";

interface LessonItemProps {
  lesson: VideoLesson | AssessmentLesson;
  infoSelectedLesson: VideoLesson | AssessmentLesson | null;
  lessonStatus: boolean[];
  selectedCourse: Course | null;
}

export const LessonItem: FC<LessonItemProps> = ({
  lesson,
  infoSelectedLesson,
  lessonStatus,
  selectedCourse,
}) => {
  const router = useRouter();
  const { courseName, tema, courseId } = useParams();
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  const sequentialLesson = lesson.sequentialLesson
    ? lesson.sequentialLesson
    : "";

  const handleItemClick = (sequentialLesson: number) => {
    if (selectedTopic) {
      const selectedLesson = selectedTopic.lessons[sequentialLesson - 1];

      let lessonId;

      if ("videoId" in lesson) {
        lessonId = (lesson as VideoLesson).videoId;
      } else if ("_id" in lesson) {
        lessonId = (lesson as AssessmentLesson)._id;
      }
      const url = `/dashboard/courses/${courseName}/${courseId}/${lessonId}/${tema}/${sequentialLesson}`;
      router.push(url);
    }
  };

  const isLessonBlocked = !lessonStatus[parseInt(sequentialLesson) - 1];
  const isCourseMandatory = selectedCourse?.mandatory;
  const isLessonUnlocked =
    !isCourseMandatory || (isCourseMandatory && !isLessonBlocked);

  return (
    <div
      key={sequentialLesson}
      className={`${styles["classRoomRoute-subcontent"]}`}
      onClick={() => {
        if (isLessonUnlocked) {
          handleItemClick(parseInt(sequentialLesson));
        }
      }}
    >
      <div
        className={`${styles["classRoomRoute-title"]} ${
          infoSelectedLesson?.sequentialLesson &&
          parseInt(infoSelectedLesson.sequentialLesson) ===
            parseInt(sequentialLesson)
            ? styles["selected"]
            : ""
        } ${!isLessonUnlocked ? styles["blocked"] : ""}`}
      >
        {sequentialLesson}
      </div>

      <div
        className={`${styles["classRoomRoute-iconCircle"]} ${
          isCourseMandatory && !isLessonBlocked ? styles["unlocked"] : ""
        } ${
          infoSelectedLesson?.sequentialLesson &&
          parseInt(infoSelectedLesson.sequentialLesson) ===
            parseInt(sequentialLesson)
            ? styles["selected"]
            : ""
        }`}
      >
        {sequentialLesson}
      </div>

      <div
        className={`${styles["classRoomRoute-line"]} ${
          parseInt(sequentialLesson) === selectedTopic?.lessons.length
            ? styles["hide"]
            : ""
        }`}
      ></div>
    </div>
  );
};
