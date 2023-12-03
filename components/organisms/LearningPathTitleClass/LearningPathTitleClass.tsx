"use client";
import { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Course } from "../../../types/types/course.types";
import styles from "./LearningPathTitleClass.module.css";

interface LearningPathVideoClassProps {
  course: Course | null;
}

interface Video {
  title: string;
  description: string;
}
export const LearningPathTitleClass: FC<LearningPathVideoClassProps> = ({
  course,
}) => {
  const { idvideo } = useParams();
  const videoId: string = Array.isArray(idvideo) ? idvideo[0] : idvideo;
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (course && videoId) {
      const video = course.content.find(
        (video) => video.idVideo === parseInt(videoId, 10)
      );

      if (video) {
        setCurrentVideo(video);
      }
    }
  }, [course, idvideo]);

  if (!course || !currentVideo) {
    return <div></div>;
  }

  const { name } = course;

  return (
    <div className={styles["learningPathTitleClass-container"]}>
      <p className={styles["learningPathTitleClass-topic"]}>{name}</p>
      <div className={styles["learningPathTitleClass-line"]}></div>
      <h2 className={styles["learningPathTitleClass-title"]}>
        {currentVideo.title}
      </h2>
      <div className={styles["learningPathTitleClass-subcontent"]}>
        <p>{currentVideo.description}</p>
      </div>
    </div>
  );
};
