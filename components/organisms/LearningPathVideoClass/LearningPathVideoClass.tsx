"use client";
import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FullStarIcon } from "../../atoms/icons/starIcon/FullStarIcon";
import { EmptyStarIcon } from "../../atoms/icons/starIcon/EmptyStarIcon";
import { Button } from "../../atoms";
import { Course } from "../../../types/types/course.types";
import styles from "./LearningPathVideoClass.module.css";
import { TaringStart } from "../TaringStart/TaringStart";

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
  const [userRating, setUserRating] = useState<number>(0);
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
  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
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
              <TaringStart
                totalStars={5}
                userRating={userRating}
                onRatingChange={handleRatingChange}
              />
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
