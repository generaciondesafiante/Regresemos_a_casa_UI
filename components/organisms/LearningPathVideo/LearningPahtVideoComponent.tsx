import { FC } from "react";
import styles from "./LearningPathVideo.module.css";
import ReactPlayer from "react-player";
import { TaringStart } from "../TaringStart/TaringStart";
import { Button } from "../../atoms";

interface LearningPahtVideoComponentProps {
  isVideoReady: boolean;
  selectedResource: any;
  handleDuration: (duration: number) => void;
  obtenerDuracionFormateada: (length: number) => string;
  userRating: number;
  handleRatingChange: (rating: number) => void;
  updateLasVideoUser?: () => void;
  onNextVideoClick?: () => void;
  duracionTotal: number;
}

export const LearningPahtVideoComponent: FC<
  LearningPahtVideoComponentProps
> = ({
  isVideoReady,
  selectedResource,
  handleDuration,
  obtenerDuracionFormateada,
  userRating,
  handleRatingChange,
  updateLasVideoUser,
  duracionTotal,
  onNextVideoClick,
}) => {
  return (
    <div className={styles["learningPathVideoClass-container"]}>
      <div className={styles["learningPathVideoClass-content"]}>
        {isVideoReady ? (
          <div className={styles["learningPathVideoClass-video"]}>
            <ReactPlayer
              url={selectedResource?.resourceUrl}
              controls={true}
              playsinline={true}
              pip={true}
              stopOnUnmount
              onDuration={handleDuration}
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
          <Button className={styles["enabled"]} onClick={onNextVideoClick}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};
