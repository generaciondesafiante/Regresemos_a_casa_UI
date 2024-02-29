"use client";
import { FC, useEffect, useState } from "react";
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
  const [lessonStatus, setLessonStatus] = useState<boolean[]>([]);

  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  const courseProgress = useAppSelector(
    (state) => state.user.userInfo?.CourseProgress
  );
  const infoSelectedLesson = useAppSelector(
    (state) => state.lessons.selectedLesson
  );
  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
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

  useEffect(() => {
    if (selectedTopic && courseProgress) {
      const courseProgressForCurrentTopic = courseProgress.find(
        (progress) => progress.idCourse === selectedCourse?._id
      );

      const sequentialTopicInCourseProgress = parseInt(
        courseProgressForCurrentTopic?.topics[0].sequentialTopic
      );
      const sequentialTopicCurrent = parseInt(selectedTopic?.sequentialTopic);

      if (sequentialTopicCurrent < sequentialTopicInCourseProgress) {
        const newLessonStatus = selectedTopic.lessons.map(() => true);
        setLessonStatus(newLessonStatus);
      } else if (sequentialTopicCurrent === sequentialTopicInCourseProgress) {
        const sequentialLessonUser = parseInt(
          courseProgressForCurrentTopic.topics[0].lessons[0].sequentialLesson.trim()
        );

        const newLessonStatus = selectedTopic.lessons.map((lesson) => {
          const lessonNumber = parseInt(lesson.sequentialLesson);
          return lessonNumber <= sequentialLessonUser;
        });

        setLessonStatus(newLessonStatus);
      }
    }
  }, [selectedTopic, courseProgress, selectedCourse, infoSelectedLesson]);

  const handleLessonClick = (lessonIndex: number) => {
    if (!selectedCourse?.mandatory || lessonStatus[lessonIndex]) {
      onItemClick && onItemClick(lessonIndex);
      dispatch(selectLesson(selectedTopic.lessons[lessonIndex]));
    }
  };
  return (
    <>
      {selectedTopic?.lessons.map((lesson, index) => (
        <div
          key={lesson.sequentialLesson}
          className={`${styles["classRoomRoute-subcontent"]}`}
          onClick={() => handleLessonClick(index)}
        >
          <div
            className={`${styles["classRoomRoute-title"]} ${
              infoSelectedLesson?.sequentialLesson &&
              parseInt(infoSelectedLesson.sequentialLesson) ===
                parseInt(lesson.sequentialLesson)
                ? styles["selected"]
                : ""
            } ${!lessonStatus[index] ? styles["blocked"] : ""}`}
          >
            {lesson.sequentialLesson}
          </div>

          <div
            className={`${styles["classRoomRoute-iconCircle"]} ${
              selectedCourse?.mandatory && !lessonStatus[index]
                ? styles["unlocked"]
                : ""
            } ${
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
