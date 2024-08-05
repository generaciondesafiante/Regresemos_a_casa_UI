"use client";
import { FC, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Course } from "../../../types/types/course.types";
import styles from "./LearningPathProgress.module.css";
import { selectedResource } from "../../../store/slices/ResourceSlice";

interface LessonItemProps {
  selectedCourse: Course | null;
  index: number;
}

export const LessonItem: FC<LessonItemProps> = ({ index }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { courseName, tema, courseId } = useParams();

  const userSelectedTopic = useAppSelector(
    (state) => state.topics.selectedTopic
  );
  const userProgress = useAppSelector(
    (state) => state.user.userInfo?.CourseProgress
  ); // Suponiendo que tienes el progreso del usuario en el estado

  // Verifica si el progreso del usuario incluye recursos para el curso y el tema actuales
  const courseProgress = userProgress?.find(
    (progress: any) => progress.course.toString() === courseId
  );
  const topicProgress = courseProgress?.topics?.find(
    (topic: any) => topic.topicId === userSelectedTopic?._id
  );

  // Determina el máximo índice de lecciones completadas
  const maxCompletedIndex =
    topicProgress?.resources.reduce(
      (max: any, resource: any, idx: any) =>
        resource.viewResource ? Math.max(max, idx) : max,
      -1
    ) ?? -1;

  console.log(maxCompletedIndex + 2, index);
  // Verifica si la lección actual está desbloqueada
  const isLessonUnlocked = index <= maxCompletedIndex + 2;
  console.log(isLessonUnlocked);
  const handleItemClick = (lessonIndex: number) => {
    console.log(lessonIndex);

    if (userSelectedTopic) {
      const resource = userSelectedTopic.resources[lessonIndex - 1];
      console.log(resource);
      if (resource) {
        dispatch(selectedResource(resource));
      }

      // Navigate to the URL
      const lessonId = userSelectedTopic.resources[lessonIndex - 1]?._id._id;
      const url = `/dashboard/courses/${courseName}/${courseId}/${lessonId}/${tema}/${lessonIndex}`;
      router.push(url);
    }
  };

  return (
    <div
      key={index}
      className={`${styles["classRoomRoute-subcontent"]} ${
        !isLessonUnlocked ? styles["blocked"] : ""
      }`}
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
          index === (userSelectedTopic?.resources.length ?? 0) - 1
            ? styles["hide"]
            : ""
        }`}
      ></div>
    </div>
  );
};
