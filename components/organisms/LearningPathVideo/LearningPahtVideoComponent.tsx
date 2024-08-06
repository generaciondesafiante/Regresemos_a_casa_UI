"use state";
import { FC, useEffect, useState } from "react";
import styles from "./LearningPathVideo.module.css";
import ReactPlayer from "react-player";
import { TaringStart } from "../TaringStart/TaringStart";
import { Button } from "../../atoms";
import { useParams, useRouter } from "next/navigation";

interface LearningPahtVideoComponentProps {
  isVideoReady: boolean;
  selectedResource: any;
  userProgressCourse: any;
  typeOfRouteCourse: any;
  handleDuration: (duration: number) => void;
  getFormattedDuration: (length: number) => string;
  userRating: number;
  handleRatingChange: (rating: number) => void;
  updateLasVideoUser?: () => void;
  onNextVideoClick?: () => void;
  totalDuration: number;
  handleProgress: (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => void;
  videoProgress: number;
  currentResourceIndex: number | 0;
  selectedTopic: any;
}

export const LearningPahtVideoComponent: FC<
  LearningPahtVideoComponentProps
> = ({
  isVideoReady,
  selectedResource,
  handleDuration,
  getFormattedDuration,
  userRating,
  handleRatingChange,
  updateLasVideoUser,
  totalDuration,
  onNextVideoClick,
  handleProgress,
  videoProgress,
  typeOfRouteCourse,
  userProgressCourse,
  currentResourceIndex,
  selectedTopic,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();
  const params = useParams();
  console.log(isButtonDisabled);
  console.log(userProgressCourse);
  useEffect(() => {
    const currentResourceIndex = selectedTopic?.resources?.findIndex(
      (resource: any) => resource._id._id === selectedResource?._id
    );
    console.log(
      userProgressCourse.lastViewedTopic.topic[0].lastViewedResource._id
    );

    const lastViewedResourceIndex = selectedTopic?.resources?.findIndex(
      (resource: any) =>
        resource._id._id ===
        userProgressCourse.lastViewedTopic.topic[0].lastViewedResource._id
    );

    console.log(currentResourceIndex, lastViewedResourceIndex);

    if (typeOfRouteCourse === "flexible") {
      setIsButtonDisabled(false);
    } else if (typeOfRouteCourse === "strict") {
      if (
        currentResourceIndex <= lastViewedResourceIndex ||
        videoProgress >= 0.9
      ) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
  }, [
    typeOfRouteCourse,
    userProgressCourse,
    currentResourceIndex,
    videoProgress,
    selectedResource,
    selectedTopic,
  ]);

  const handleNextButtonClick = () => {
    const currentResourceIndex = selectedTopic?.resources?.findIndex(
      (resource: any) => resource._id._id === selectedResource?._id
    );
    const totalResources = selectedTopic?.resources?.length;

    if (currentResourceIndex + 1 === totalResources) {
      router.push(`/dashboard/courses/${params.courseName}/${params.courseId}`);
    } else {
      if (onNextVideoClick) onNextVideoClick();
    }
  };

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
              onProgress={handleProgress}
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
                  {getFormattedDuration(totalDuration)}
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
            className={styles[isButtonDisabled ? "disabled" : "enabled"]}
            onClick={handleNextButtonClick}
            disabled={isButtonDisabled}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};
