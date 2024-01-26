"use client";
import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player/lazy";
import { Button } from "../../atoms";
import { TaringStart } from "../TaringStart/TaringStart";
import { Topic } from "../../../types/types/topic.type";
import { Lesson } from "../../../types/types/lessons.type";
import styles from "./LearningPathVideoClass.module.css";

interface LearningPathVideoClassProps {
  selectedLesson: Lesson | null;
  selectedTopic: Topic | null;
  onNextVideoClick: (index: string) => void;
  setViewVideo?: Dispatch<SetStateAction<boolean>> | boolean;
  courseProgress: any[];
  lastViewedVideo: {
    courseName: string;
    idCourse: string;
    videoId: string;
    tema: string;
    id: string;
  };
}

export const LearningPathVideoClass: FC<LearningPathVideoClassProps> = ({
  selectedLesson,
  onNextVideoClick,
  setViewVideo,
  courseProgress,
  selectedTopic,
  lastViewedVideo,
}) => {
  const { indexVideo, courseId } = useParams();

  const [userRating, setUserRating] = useState<number>(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [duracionTotal, setDuracionTotal] = useState<number>(0);
  const [enableButton, setEnableButton] = useState(false);
  const [video, setVideo] = useState(false);
  const urlVideo = selectedLesson?.videoUrl;

  const handleVideoPlay = () => {
    setVideo(true);
  };

  const handleVideoPause = () => {
    setVideo(true);
  };

  useEffect(() => {
    if (video) {
      const sendVideoInfo = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lastViewedVideo/${lastViewedVideo.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                courseName: lastViewedVideo.courseName,
                courseId: lastViewedVideo.idCourse,
                videoId: lastViewedVideo.videoId,
                tema: lastViewedVideo.tema,
                indexTopic: indexVideo,
                urlVideo: urlVideo,
              }),
            }
          );

          if (response.ok) {
            console.log("Video information sent successfully");
          } else {
            console.error("Error sending video information");
          }
        } catch (error) {
          console.error("Error when making fetch request:", error);
        }
      };
      setVideo(false);
      sendVideoInfo();
    }
  }, [video, lastViewedVideo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoReady(true);
    }, 1000);

    return () => setIsVideoReady(false);
  }, [selectedLesson]);

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

  const obtenerDuracionFormateada = (length: number) => {
    length = Math.round(length);

    const horas = Math.floor(length / 3600);
    const minutosRestantes = Math.floor((length % 3600) / 60);
    const segundos = length % 60;

    const duracionFormateada =
      (horas > 0 ? `${horas}:` : "") +
      (minutosRestantes < 10 ? "0" : "") +
      `${minutosRestantes}:${segundos < 10 ? "0" : ""}${segundos}`;

    return duracionFormateada;
  };

  const handleDuration = (duration: number) => {
    setDuracionTotal(duration);
  };

  const enableFollowVideoButton = async (progressVideo: any) => {
    const currentVideo = progressVideo.played;
    const threshold = 0.95;

    if (typeof setViewVideo === "function") {
      if (currentVideo >= threshold) {
        setViewVideo(true);
        setEnableButton(true);
      }
    } else if (typeof setViewVideo === "boolean") {
      if (setViewVideo === false && currentVideo >= threshold) {
      }
    }
  };

  useEffect(() => {
    if (courseProgress.length > 0 && selectedTopic && selectedLesson) {
      const currentCourse = courseProgress.find(
        (course) => course.idCourse === courseId
      );

      if (currentCourse) {
        const currentTopic = currentCourse.topics.find(
          (topic: any) => topic.idTopic === selectedTopic._id
        );

        if (currentTopic) {
          const currentLesson = currentTopic.lessons.find(
            (lesson: any) => lesson.idLesson === selectedLesson._id
          );

          if (currentLesson && currentLesson.viewVideo) {
            setEnableButton(true);
            if (typeof setViewVideo === "function") {
              setViewVideo(true);
            }
          }
        }
      }
    }
  }, [selectedLesson, courseProgress, courseId, selectedTopic]);

  return (
    <div className={styles["learningPathVideoClass-container"]}>
      <div className={styles["learningPathVideoClass-content"]}>
        {isVideoReady ? (
          <div className={styles["learningPathVideoClass-video"]}>
            <ReactPlayer
              url={selectedLesson?.videoUrl}
              controls={true}
              playsinline={true}
              pip={true}
              stopOnUnmount
              onDuration={handleDuration}
              onProgress={enableFollowVideoButton}
              width={"100%"}
              height={"100%"}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
            />
          </div>
        ) : (
          <div className={styles["learningPathVideoClass-skeletonVideo"]}></div>
        )}

        <div
          className={styles["learningPathVideoClass-content_videoInteraction"]}
        >
          <div>
            {isVideoReady ? (
              <div>
                <p
                  className={
                    styles["learningPathVideoClass-videoInteraction_title"]
                  }
                >
                  {obtenerDuracionFormateada(duracionTotal)}
                </p>
              </div>
            ) : (
              <div
                className={styles["learningPathVideoClass-skeletonTimeVideo"]}
              ></div>
            )}

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
            className={enableButton ? styles["enabled"] : styles["disabled"]}
            disabled={!enableButton}
            onClick={handleNextVideo}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};
