"use client";
import { FC, useEffect, useState } from "react";
import { Topic } from "../../../types/types/topic.type";
import { useParams } from "next/navigation";
import styles from "./LearningPathProgress.module.css";

interface LearningPathVideoClassProps {
  course: Topic | null;
  onItemClick: (index: number) => void;
}

export const LearningPathProgress: FC<LearningPathVideoClassProps> = ({
  course,
  onItemClick,
}) => {
  const { lessonId, indexVideo } = useParams();

  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    const videoId = Array.isArray(lessonId) ? lessonId[0] : lessonId;
    const videoIndex = parseInt(videoId, 10);
    if (!isNaN(videoIndex)) {
      setSelectedItem(videoIndex - 1);
    }
  }, [lessonId]);

  const indexVideoString = Array.isArray(indexVideo)
    ? indexVideo.join(",")
    : indexVideo;

  const indexVideoNumber = parseInt(indexVideoString, 10);

  if (!course || !course.lessons) {
    return <div></div>;
  }

  return (
    <>
      {course?.lessons.map((lesson, index) => (
        <div
          key={index}
          className={`${styles["classRoomRoute-subcontent"]}`}
          onClick={() => onItemClick && onItemClick(index + 1)}
        >
          <div
            className={`${styles["classRoomRoute-title"]} ${
              indexVideoNumber - 1 === index ? styles["selected"] : ""
            }`}
          >
            {index + 1}
          </div>

          <div
            className={`${styles["classRoomRoute-iconCircle"]} ${
              indexVideoNumber - 1 === index ? styles["selected"] : ""
            }`}
          >
            {index + 1}
          </div>

          <div
            className={`${styles["classRoomRoute-line"]} ${
              index === course.lessons.length - 1 ? styles["hide"] : ""
            }`}
          ></div>
        </div>
      ))}
    </>
  );
};
