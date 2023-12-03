"use client";
import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import { Course } from "../../../types/types/course.types";
import styles from "./LearningPathVideoClass.module.css";

interface LearningPathVideoClassProps {
  course: Course | null;
}
interface Video {
  title: string;
  description: string;
  url: string;
  idVideo: number;
}

export const LearningPathVideoClass: FC<LearningPathVideoClassProps> = ({
  course,
}) => {
  const { idvideo } = useParams();
  const videoId: string = Array.isArray(idvideo) ? idvideo[0] : idvideo;

  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (videoId) {
      const video = course?.content.find(
        (video) => video.idVideo === parseInt(videoId, 10)
      );

      if (video) {
        setCurrentVideo(video);
      }
    }
  }, [course, videoId]);

  const handleNextVideo = () => {
    if (videoId) {
      const currentIndex =
        course?.content.findIndex(
          (video) => video.idVideo === parseInt(videoId, 10)
        ) ?? -1;

      if (
        currentIndex !== -1 &&
        currentIndex < (course?.content.length || 0) - 1
      ) {
        const nextVideo = course?.content[currentIndex + 1];
        const nextVideoUrl = `/dashboard/path/course/${course?.id}/${course?.endpoint}/${nextVideo?.idVideo}`;
        router.push(nextVideoUrl);
      }
    }
  };

  if (!course || !currentVideo) {
    return <div></div>;
  }

  return (
    <div className={styles["learningPathVideoClass-container"]}>
      <iframe
        className={styles["learningPathVideoClass-video"]}
        src={currentVideo.url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      <div
        className={styles["learningPathVideoClass-content_videoInteraction"]}
      >
        <div
          className={
            styles["learningPathVideoClass-subcontent_videoInteraction"]
          }
        >
          <p
            className={styles["learningPathVideoClass-videoInteraction_title"]}
          >
            1 H 40 MIN
          </p>
          <StarIcon
            className={styles["learningPathVideoClass-videoInteraction_icon"]}
          />
          <StarIcon
            className={styles["learningPathVideoClass-videoInteraction_icon"]}
          />
          <StarIcon
            className={styles["learningPathVideoClass-videoInteraction_icon"]}
          />
        </div>
        <div className={styles["learningPathVideoClass-subcontent_btn"]}>
          <div className={styles["learningPathVideoClass-btn_activity"]}>
            <Link
              href={"/"}
              className={styles["learningPathVideoClass-btn_textActivity"]}
            >
              ACTIVIDAD
            </Link>
          </div>
          <button
            className={`${styles["learningPathVideoClass-btn_next"]} ${styles["learningPathVideoClass-btn_textNext"]}`}
            onClick={handleNextVideo}
          >
            SIGUIENTE
          </button>
        </div>
      </div>
    </div>
  );
};
