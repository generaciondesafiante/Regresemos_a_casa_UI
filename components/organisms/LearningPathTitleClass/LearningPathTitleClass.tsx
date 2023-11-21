import { FC } from "react";
import styles from "./LearningPathTitleClass.module.css";
import { Course } from "..";

interface LearningPathVideoClassProps {
  course: Course | null;
}
export const LearningPathTitleClass: FC<LearningPathVideoClassProps> = ({
  course,
}) => {
  if (!course) {
    return <div></div>;
  }

  const { name } = course;

  return (
    <div className={styles["learningPathTitleClass-container"]}>
      <p className={styles["learningPathTitleClass-topic"]}>{name}</p>
      <div className={styles["learningPathTitleClass-line"]}></div>
      <h2 className={styles["learningPathTitleClass-title"]}>
        {course.content[0].title}
      </h2>
      <div className={styles["learningPathTitleClass-subcontent"]}>
        <p> {course.content[0].description}</p>
      </div>
    </div>
  );
};
