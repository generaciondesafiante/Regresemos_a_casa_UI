"use client";
import { FC } from "react";
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
  );

  const userSelectedResource = useAppSelector(
    (state) => state.resource.selectedResource?._id
  );

  const lastViewedResourceIndex =
    userProgress && userProgress.length > 0
      ? userSelectedTopic?.resources.findIndex(
          (resource: any) =>
            resource._id._id ===
            userProgress[0].lastViewedTopic.topic[0].lastViewedResource._id
        )
      : null;

  const currentResourceIndex = userSelectedTopic?.resources.findIndex(
    (resource: any) => resource._id._id === userSelectedResource
  );

  const handleItemClick = (lessonIndex: number) => {
    if (userSelectedTopic) {
      const resource = userSelectedTopic.resources[lessonIndex - 1];
      if (resource) {
        dispatch(selectedResource(resource));
      }

      const lessonId = userSelectedTopic.resources[lessonIndex - 1]?._id;
      const url = `/dashboard/courses/${courseName}/${courseId}/${lessonId}/${tema}/${lessonIndex}`;
      router.push(url);
    }
  };

  const isViewed =
    lastViewedResourceIndex !== undefined &&
    lastViewedResourceIndex !== null &&
    index <= lastViewedResourceIndex;

  const isSelected = index === currentResourceIndex;
  return (
    <div key={index} className={`${styles["classRoomRoute-subcontent"]} `}>
      <div className={`${styles["classRoomRoute-title"]}`}>{index + 1}</div>
      <div
        className={`${styles["classRoomRoute-iconCircle"]} ${
          isViewed ? styles["viewedResource"] : styles["unlocked"]
        } ${isSelected ? styles["selected"] : ""}`}
        onClick={isViewed ? () => handleItemClick(index + 1) : undefined}
      >
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
