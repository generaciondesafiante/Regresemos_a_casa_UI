"use client";
import { useRouter } from "next/navigation";
import IconBxLock from "../../atoms/icons/lockPathIcon/PathLockIcon";
import IconBxLockOpen from "../../atoms/icons/unLockPathIcon/PathUnlockIcon";
import { FlagStartIcon } from "../../atoms/icons/flagsIcon/FlagStartIcon";
import { FlagEndIcon } from "../../atoms/icons/flagsIcon/FlagEndIcon";
import { DavidStarIcon } from "../../atoms/icons/davidStar/DavidStarIcon";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { selectTopic } from "../../../store/slices/topicsSlice";
import styles from "./Path.module.css";

export const Path = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );
  const userInformation = useAppSelector((state) => state.user.userInfo);
  const topicsCourses = selectedCourse?.topics;

  const isTopicUnlocked = (topic: any) => {
    if (selectedCourse && userInformation?.CourseProgress) {
      const courseProgress = userInformation.CourseProgress.find(
        (progress) => progress.idCourse === selectedCourse._id
      );

      if (courseProgress) {
        const sequentialTopic = parseInt(
          courseProgress.topics[0].sequentialTopic
        );
        const currentTopicSequential = parseInt(topic.sequentialTopic);
        return sequentialTopic >= currentTopicSequential;
      } else {
        const currentTopicSequential = parseInt(topic.sequentialTopic);
        return currentTopicSequential === 1;
      }
    }

    return !selectedCourse?.mandatory;
  };

  const handleUrlId = (topic: any) => {
    const topicName = topic.topicName
      .replace(/\s+/g, "_")
      .replace(/́/g, "")
      .replace(/ñ/g, "n")
      .toLowerCase();

    const lessonId = topic.lessons[0].videoId;
    const url = `/dashboard/courses/${topicName}/${topic._id}/${lessonId}/${topicName}/${topic.sequentialTopic}`;
    dispatch(selectTopic(topic));
    router.push(url);
  };

  return (
    <div className={styles["path-container"]}>
      <h2 className={styles["path-title"]}>
        ¡Vamos de<span> regreso </span>a casa! <DavidStarIcon />
      </h2>
      <div className={styles["path-content"]}>
        {topicsCourses?.map((topic, topicIndex) => {
          const isUnlocked = isTopicUnlocked(topic);

          const isFirstTopicUnlocked = selectedCourse?.mandatory
            ? topicIndex === 0 || isUnlocked
            : true;

          return (
            <div
              key={topic.sequentialTopic}
              className={styles["path-topicContainer"]}
            >
              <div className={styles["path-border"]}>
                {topicIndex === 0 && (
                  <FlagStartIcon
                    className={`${styles["path-flagIcon"]} ${styles["path-flagIcon_start"]}`}
                  />
                )}

                {topicIndex === topicsCourses.length - 1 && (
                  <FlagEndIcon
                    className={`${styles["path-flagIcon"]} ${styles["path-flagIcon_end"]}`}
                  />
                )}

                <button
                  onClick={() => handleUrlId(topic)}
                  className={styles["path-button"]}
                  disabled={!isFirstTopicUnlocked}
                >
                  {selectedCourse?.mandatory ? (
                    isUnlocked ? (
                      <IconBxLockOpen />
                    ) : (
                      <IconBxLock />
                    )
                  ) : (
                    <DavidStarIcon
                      className={styles["iconStartDavid-mandatory"]}
                    />
                  )}
                </button>
              </div>
              <p className={styles["path-CourseTitle"]}>{topic.topicName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
