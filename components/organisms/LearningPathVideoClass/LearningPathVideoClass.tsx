"use client";
import { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "../../atoms";
import { TaringStart } from "../TaringStart/TaringStart";
import { Topic } from "../../../types/types/topic.type";
import { Lesson } from "../../../types/types/lessons.type";
import styles from "./LearningPathVideoClass.module.css";

interface LearningPathVideoClassProps {
  course: Topic | null;
  selectedLesson: Lesson | null;
  onNextVideoClick: (index: string) => void;
}

export const LearningPathVideoClass: FC<LearningPathVideoClassProps> = ({
  selectedLesson,
  onNextVideoClick,
}) => {
  const { indexVideo } = useParams();

  const [userRating, setUserRating] = useState<number>(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const handleNextVideo = () => {
    if (Array.isArray(indexVideo)) {
      const firstIndex = indexVideo[0];

      onNextVideoClick(firstIndex);
    } else {
      onNextVideoClick(indexVideo);
    }
  };

  const videoUrl = selectedLesson?.videoUrl;
  const modifiedUrl = videoUrl?.replace("/play/", "/embed/");
  const responsiveVideoUrl = `${modifiedUrl}?loop=true&muted=true&preload=true&responsive=true`;

  useEffect(() => {
    setIsVideoLoaded(false);
    setTimeout(() => {
      setIsVideoLoaded(true);
    }, 80);
    setTimeout(() => {
      setShowContent(true);
    }, 80);
  }, [selectedLesson]);

  return (
    <div className={styles["learningPathVideoClass-container"]}>
      <div className={styles["learningPathVideoClass-content"]}>
        <div
          style={{
            position: "relative",
            paddingTop: "56.25%",
          }}
        >
          {isVideoLoaded && (
            <iframe
              src={responsiveVideoUrl}
              loading="lazy"
              className={styles["learningPathVideoClass-video"]}
              style={{
                border: "0",
                position: "absolute",
                top: 0,
                height: "100%",
                width: "100%",
              }}
              allow="accelerometer;gyroscope;encrypted-media;picture-in-picture;"
              allowFullScreen
            ></iframe>
          )}
        </div>

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
