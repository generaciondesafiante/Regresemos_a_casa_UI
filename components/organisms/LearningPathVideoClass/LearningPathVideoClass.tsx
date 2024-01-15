"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player/lazy";
import { Button } from "../../atoms";
import { TaringStart } from "../TaringStart/TaringStart";
import { Lesson } from "../../../types/types/lessons.type";
import styles from "./LearningPathVideoClass.module.css";
import { useSession } from "next-auth/react";

interface LearningPathVideoClassProps {
  selectedLesson: Lesson | null;
  onNextVideoClick: (index: string) => void;
}

interface Video {
  idVideo: string;
  viewVideo: boolean;
}

interface Lessons {
  idLesson: string;
  videos: Video[];
}

interface Topic {
  idTopic: string;
  lessons: Lessons[];
}

interface Course {
  idCourse: string;
  topics: Topic[];
}
export const LearningPathVideoClass: FC<LearningPathVideoClassProps> = ({
  selectedLesson,
  onNextVideoClick,
}) => {
  const { _id: idLessonCourse } = selectedLesson || {};
  const { indexVideo, courseId, lessonId } = useParams();
  const { data: session } = useSession();
  const idUser = session?.user.uid;

  const viewVideoRef = useRef(false);

  const [userRating, setUserRating] = useState<number>(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [duracionTotal, setDuracionTotal] = useState<number>(0);
  const [enableButton, setEnableButton] = useState(false);
  const idTopicString = localStorage.getItem("idTopic");
  const idTopic = idTopicString ? JSON.parse(idTopicString) : null;

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

  const [requestSent, setRequestSent] = useState(false);

  const enableFollowVideoButton = async (progressVideo: any) => {
    const currentVideo = progressVideo.played;
    const threshold = 0.95;

    if (currentVideo >= threshold && !requestSent) {
      viewVideoRef.current = true;
      console.log(viewVideoRef.current);
      setEnableButton(true);
      console.log("eyy");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/updateVideoStatus/${idUser}/${courseId}/${idTopic}/${idLessonCourse}/${lessonId}`,
          {
            method: "PUT",
            body: JSON.stringify({ viewVideo: viewVideoRef.current }),
          }
        );

        if (response.ok) {
          console.log("eyyy");
          console.log(idUser);
          const id = idUser;
          console.log(id);
          const videoProgress = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/userinformations`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: idUser }),
            }
          );
          if (videoProgress.ok) {
            const resVideoProgress = await videoProgress.json();
            console.log(resVideoProgress);
          } else {
            console.error(
              `Error en la solicitud: ${videoProgress.status} - ${videoProgress.statusText}`
            );
          }
          setRequestSent(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles["learningPathVideoClass-container"]}>
      <div className={styles["learningPathVideoClass-content"]}>
        {isVideoReady && (
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
            />
          </div>
        )}
        {!isVideoReady && (
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
