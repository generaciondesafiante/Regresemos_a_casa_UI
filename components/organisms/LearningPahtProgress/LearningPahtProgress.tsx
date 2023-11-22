"use client";
import { FC } from "react";
import { Course } from "..";
import styles from "./LearningPahtProgress.module.css";
import { useRouter } from "next/navigation";

interface LearningPathVideoClassProps {
  course: Course | null;
  isSelected: boolean;
  onItemClick: (index: number) => void;
}

export const LearningPahtProgress: FC<LearningPathVideoClassProps> = ({
  course,
  isSelected,
  onItemClick,
}) => {
  const router = useRouter();

  if (!course || !course.content) {
    return <div></div>;
  }

  return (
    <>
      {course.content.map((lesson, index) => (
        <div
          key={index}
          className={`${styles["classRoomRoute-subcontent"]} ${
            isSelected ? styles["selected"] : ""
          }`}
          onClick={() => onItemClick(index)}
        >
          <div className={styles["classRoomRoute-title"]}>{index + 1}</div>

          <div className={styles["classRoomRoute-iconCircle"]}>{index + 1}</div>

          <div
            className={`${styles["classRoomRoute-line"]} ${
              index === course.content.length - 1 ? styles["hide"] : ""
            }`}
          ></div>
        </div>
      ))}
    </>
  );
};
