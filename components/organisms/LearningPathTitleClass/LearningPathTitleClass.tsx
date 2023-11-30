"use client";
import { FC, useEffect, useState } from "react";
import styles from "./LearningPathTitleClass.module.css";
import { Course } from "..";
import { useParams } from "next/navigation";

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
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    if (course && idvideo) {
      const video = course.content.find(
        (video) => video.idVideo === parseInt(idvideo, 10)
      );

      if (video) {
        setCurrentVideo(video);
      }
    }
  }, [course, idvideo]);

  if (!course || !currentVideo) {
    return <div>Loading...</div>;
  }

  const { name } = course;

  return (
    <div className={styles["learningPathTitleClass-container"]}>
      <p className={styles["learningPathTitleClass-topic"]}>{name}</p>
      <div className={styles["learningPathTitleClass-line"]}></div>
      <h2 className={styles["learningPathTitleClass-title"]}>
        {/* {course.content[0].title} */}
        {currentVideo.title}
      </h2>
      <div className={styles["learningPathTitleClass-subcontent"]}>
        <p>
          {/* {course.content[0].description} */}
          {currentVideo.description}
        </p>
      </div>
    </div>
  );
};
