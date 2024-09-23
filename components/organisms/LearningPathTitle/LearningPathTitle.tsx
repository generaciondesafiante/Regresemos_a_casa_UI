"use client";
import { FC } from "react";
import Link from "next/link";
import { useAppSelector } from "../../../store/store";
import { ArrowLeftIcon } from "../../atoms";
import styles from "./LearningPathTitle.module.css";
import { useParams } from "next/navigation";

export const LearningPathTitleClass: FC = () => {
  const params = useParams();

  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  const infoSelectedLesson = useAppSelector(
    (state) => state.resource.selectedResource?._id
  );

  return (
    <div className={styles["learningPathTitleClass-container"]}>
      <div className={styles["containerBackReturnTopics"]}>
        <Link
          className={styles["backReturnTopics"]}
          href={`/dashboard/courses/${params.courseName}/${params.courseId}`}
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
        hola
      </h2>
      <div className={styles["learningPathTitleClass-subcontent"]}>
        <p> {infoSelectedLesson?.description}</p>
        hole
      </div>
    </div>
  );
};
