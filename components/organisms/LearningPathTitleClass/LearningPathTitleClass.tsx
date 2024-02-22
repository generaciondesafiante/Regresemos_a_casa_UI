"use client";
import { FC } from "react";
import { useAppSelector } from "../../../store/store";
import styles from "./LearningPathTitleClass.module.css";

export const LearningPathTitleClass: FC = () => {
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  const infoSelectedLesson = useAppSelector(
    (state) => state.lessons.selectedLesson
  );
  return (
    <div className={styles["learningPathTitleClass-container"]}>
      <p className={styles["learningPathTitleClass-topic"]}>
        {selectedTopic?.topicName}
      </p>
      <div className={styles["learningPathTitleClass-line"]}></div>
      <h2 className={styles["learningPathTitleClass-title"]}>
        {infoSelectedLesson?.videoName}
      </h2>
      <div className={styles["learningPathTitleClass-subcontent"]}>
        <p> {infoSelectedLesson?.description}</p>
      </div>
    </div>
  );
};
