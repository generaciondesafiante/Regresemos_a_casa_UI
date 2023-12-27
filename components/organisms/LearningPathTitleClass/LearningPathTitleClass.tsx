"use client";
import { FC } from "react";
import { Lesson } from "../../../types/types/lessons.type";
import { Topic } from "../../../types/types/topic.type";
import styles from "./LearningPathTitleClass.module.css";

interface LearningPathVideoClassProps {
  course: Topic | null;
  selectedLesson: Lesson | null;
}

export const LearningPathTitleClass: FC<LearningPathVideoClassProps> = ({
  course,
  selectedLesson,
}) => {
  return (
    <div className={styles["learningPathTitleClass-container"]}>
      <p className={styles["learningPathTitleClass-topic"]}>
        {course?.topicName}
      </p>
      <div className={styles["learningPathTitleClass-line"]}></div>
      <h2 className={styles["learningPathTitleClass-title"]}>
        {selectedLesson?.videoName}
      </h2>
      <div className={styles["learningPathTitleClass-subcontent"]}>
        <p> {selectedLesson?.description}</p>
      </div>
    </div>
  );
};
