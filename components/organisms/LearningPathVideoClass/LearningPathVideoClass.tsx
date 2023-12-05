"use client";
import Link from "next/link";
import { FullStarIcon } from "../../atoms/icons/starIcon/FullStarIcon";
import { EmptyStarIcon } from "../../atoms/icons/starIcon/EmptyStarIcon";
import styles from "./LearningPathVideoClass.module.css";
import { Button } from "../../atoms";
import { Course } from "../LearningPath/LearningPath";
import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface LearningPathVideoClassProps {
  course: Course | null;
}
export const LearningPathVideoClass: FC<LearningPathVideoClassProps> = ({
  course,
}) => {
  const { idvideo } = useParams();
  const [currentVideo, setCurrentVideo] = useState(null);
  const router = useRouter();

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

  const handleNextVideo = () => {
    if (course && idvideo) {
      const currentIndex = course.content.findIndex(
        (video) => video.idVideo === parseInt(idvideo, 10)
      );

      if (currentIndex !== -1 && currentIndex < course.content.length - 1) {
        const nextVideo = course.content[currentIndex + 1];
        const nextVideoUrl = `/dashboard/path/course/${course.id}/${course.endpoint}/${nextVideo.idVideo}`;
        router.push(nextVideoUrl);
      }
    }
  };

  if (!course || !currentVideo) {
    return <div></div>;
  }

  return (
    <div className={styles["learningPathVideoClass-container"]}>
      <div className={styles["learningPathVideoClass-content"]}>
        <iframe
          className={styles["learningPathVideoClass-video"]}
          src={currentVideo.url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <div
          className={styles["learningPathVideoClass-content_videoInteraction"]}
        >
          <div>
            <p
              className={
                styles["learningPathVideoClass-videoInteraction_title"]
              }
            >
              1H 40MIN
            </p>
            <div
              className={
                styles["learningPathVideoClass-videoInteraction_containerStar"]
              }
            >
              <FullStarIcon />
              <FullStarIcon />
              <FullStarIcon />
              <EmptyStarIcon />
              <EmptyStarIcon />
            </div>
          </div>
          <Button
            className={styles["learningPathVideoClass-btn"]}
            onClick={handleNextVideo}
          >
            SIGUIENTE
          </Button>
        </div>
      </div>
    </div>
  );
};
