"use client";
import { FC, useEffect, useState } from "react";
import { Topic } from "../../../types/types/topic.type";
import { useParams } from "next/navigation";
import styles from "./LearningPathProgress.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Lesson } from "../../../types/types/lessons.type";
import { selectLesson } from "../../../store/slices/lessonSlice";

interface LearningPathVideoClassProps {
  onItemClick: (index: number) => void;
}

export const LearningPathProgress: FC<LearningPathVideoClassProps> = ({
  onItemClick,
}) => {
  const { lessonId } = useParams();
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  const infoSelectedLesson = useAppSelector(
    (state) => state.lessons.selectedLesson
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedTopic && selectedTopic.lessons) {
      const videoId = Array.isArray(lessonId) ? lessonId[0] : lessonId;
      const selectedLesson = selectedTopic.lessons.find(
        (lesson) => lesson.videoId === videoId
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
      {selectedTopic?.lessons.map((lesson, index) => (
        <div
          key={index}
          className={`${styles["classRoomRoute-subcontent"]}`}
          onClick={() => {
            onItemClick && onItemClick(index + 1);
            dispatch(selectLesson(lesson));
          }}
        >
          <div
            className={`${styles["classRoomRoute-title"]} ${
              infoSelectedLesson?.sequentialLesson &&
              parseInt(infoSelectedLesson.sequentialLesson) - 1 === index
                ? styles["selected"]
                : ""
            }`}
          >
            {index + 1}
          </div>

          <div
            className={`${styles["classRoomRoute-iconCircle"]} ${
              infoSelectedLesson?.sequentialLesson &&
              parseInt(infoSelectedLesson.sequentialLesson) - 1 === index
                ? styles["selected"]
                : ""
            }`}
          >
            {index + 1}
          </div>

          <div
            className={`${styles["classRoomRoute-line"]} ${
              index === selectedTopic.lessons.length - 1 ? styles["hide"] : ""
            }`}
          ></div>
        </div>
      ))}
    </>
  );
};
