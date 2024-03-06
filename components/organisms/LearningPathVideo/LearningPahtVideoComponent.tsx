import { FC } from "react";
import styles from "./LearningPathVideo.module.css";
import ReactPlayer from "react-player";
import { TaringStart } from "../TaringStart/TaringStart";
import { Button } from "../../atoms";

interface LearningPahtVideoComponentProps {
  isVideoReady: boolean;
  selectedLesson: any;
  handleDuration: (duration: number) => void;
  enableFollowVideoButton: (progressVideo: any) => void;
  handleNextVideo: () => void;
  obtenerDuracionFormateada: (length: number) => string;
  userRating: number;
  handleRatingChange: (rating: number) => void;
  enableButton: boolean;
  updateLasVideoUser: () => void;
  duracionTotal: number;
}

export const LearningPahtVideoComponent: FC<LearningPahtVideoComponentProps> = ({
  isVideoReady,
  selectedLesson,
  handleDuration,
  enableFollowVideoButton,
  handleNextVideo,
  obtenerDuracionFormateada,
  userRating,
  handleRatingChange,
  enableButton,
  updateLasVideoUser,
  duracionTotal,
}) => {
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
              onPlay={updateLasVideoUser}
              onPause={updateLasVideoUser}
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
