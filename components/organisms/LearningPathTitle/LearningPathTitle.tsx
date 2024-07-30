"use client";
import { FC } from "react";
import Link from "next/link";
import { useAppSelector } from "../../../store/store";
import { ArrowLeftIcon } from "../../atoms";
import styles from "./LearningPathTitle.module.css";

export const LearningPathTitleClass: FC = () => {
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  const infoSelectedLesson = useAppSelector(
    (state) => state.resource.selectedResource
  );
  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );
  return (
    <div className={styles["learningPathTitleClass-container"]}>
      <div className={styles["containerBackReturnTopics"]}>
        <Link
          className={styles["backReturnTopics"]}
          href={`/dashboard/courses/${selectedCourse?.nameCourse}/${selectedCourse?._id}`}
        >
          <ArrowLeftIcon />
          <p>Regresar</p>
        </Link>
      </div>
      <p className={styles["learningPathTitleClass-topic"]}>
        {selectedTopic?.nameTopic}
      </p>
      <div className={styles["learningPathTitleClass-line"]}></div>
      <h2 className={styles["learningPathTitleClass-title"]}>
        {infoSelectedLesson?.title}
      </h2>
      <div className={styles["learningPathTitleClass-subcontent"]}>
        <p> {infoSelectedLesson?.description}</p>
      </div>
    </div>
  );
};
