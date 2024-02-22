"use client";
import { FC, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { selectLesson } from "../../../store/slices/lessonSlice";
import styles from "./LearningPathProgress.module.css";

interface LearningPathVideoClassProps {
  onItemClick: (index: number) => void;
}

export const LearningPathProgress: FC<LearningPathVideoClassProps> = ({
  onItemClick,
}) => {
  const { lessonId } = useParams();
  const dispatch = useAppDispatch();
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  const infoSelectedLesson = useAppSelector(
    (state) => state.lessons.selectedLesson
  );

  useEffect(() => {
    if (selectedTopic && selectedTopic.lessons) {
      const videoId = Array.isArray(lessonId) ? lessonId[0] : lessonId;
      const selectedLesson = selectedTopic.lessons.find(
        (lesson: any) => lesson.videoId === videoId
      );

      if (selectedLesson) {
        dispatch(selectLesson(selectedLesson));
      }
    }
  }, [selectedTopic, lessonId, dispatch]);

  if (!selectedTopic || !selectedTopic.lessons) {
    return <div></div>;
  }

  return (
    <>
      {selectedTopic?.lessons.map((lesson) => (
        <div
          key={lesson.sequentialLesson}
          className={`${styles["classRoomRoute-subcontent"]}`}
          onClick={() => {
            onItemClick && onItemClick(parseInt(lesson.sequentialLesson));
            dispatch(selectLesson(lesson));
          }}
        >
          <div
            className={`${styles["classRoomRoute-title"]} ${
              infoSelectedLesson?.sequentialLesson &&
              parseInt(infoSelectedLesson.sequentialLesson) ===
                parseInt(lesson.sequentialLesson)
                ? styles["selected"]
                : ""
            }`}
          >
            {lesson.sequentialLesson}
          </div>

          <div
            className={`${styles["classRoomRoute-iconCircle"]} ${
              infoSelectedLesson?.sequentialLesson &&
              parseInt(infoSelectedLesson.sequentialLesson) ===
                parseInt(lesson.sequentialLesson)
                ? styles["selected"]
                : ""
            }`}
          >
            {lesson.sequentialLesson}
          </div>

          <div
            className={`${styles["classRoomRoute-line"]} ${
              parseInt(lesson.sequentialLesson) === selectedTopic.lessons.length
                ? styles["hide"]
                : ""
            }`}
          ></div>
        </div>
      ))}
    </>
  );
};
