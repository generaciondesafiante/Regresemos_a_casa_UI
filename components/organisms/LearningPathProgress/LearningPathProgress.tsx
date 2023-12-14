"use client";
import { FC, useEffect, useState } from "react";
import { useParams} from "next/navigation";
import { Course } from "../../../types/types/course.types";
import styles from "./LearningPathProgress.module.css";

interface LearningPathVideoClassProps {
  course: Course | null;

  onItemClick: (index: number) => void;
}

export const LearningPahtProgress: FC<LearningPathVideoClassProps> = ({
  course,

  onItemClick,
}) => {
  const { idvideo } = useParams();

  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    const videoId = Array.isArray(idvideo) ? idvideo[0] : idvideo;
    const videoIndex = parseInt(videoId, 10);
    if (!isNaN(videoIndex)) {
      setSelectedItem(videoIndex - 1);
    }
  }, [idvideo]);
  if (!course || !course.content) {
    return <div></div>;
  }

  return (
    <>
      {course.content.map((lesson, index) => (
        <div
          key={index}
          className={`${styles["classRoomRoute-subcontent"]}`}
          onClick={() => {
            onItemClick(index + 1);
            setSelectedItem(index);
          }}
        >
          <div
            className={`${styles["classRoomRoute-title"]} ${
              selectedItem === index ? styles["selected"] : ""
            }`}
          >
            {index + 1}
          </div>

          <div
            className={`${styles["classRoomRoute-iconCircle"]} ${
              selectedItem === index ? styles["selected"] : ""
            }`}
          >
            {index + 1}
          </div>

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
