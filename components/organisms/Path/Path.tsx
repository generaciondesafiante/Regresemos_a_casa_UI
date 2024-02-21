"use client";
import { useRouter } from "next/navigation";
import IconBxLock from "../../atoms/icons/lockPathIcon/PathLockIcon";
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
  console.log(selectedCourse);

  const isTopicUnlocked = (topic: any) => {
    return userInformation?.CourseProgress.some(
      (progress: any) =>
        progress.courseName === selectedCourse?.courseName &&
        progress.topicName === topic.topicName
    );
  };

  const isFirstTopicUnlocked = (topicIndex: number) => {
    if (selectedCourse?.mandatory) {
      const courseProgress = userInformation?.CourseProgress;
      if (!courseProgress || courseProgress.length === 0) {
        return topicIndex === 0;
      }
      if (topicsCourses && topicsCourses.length > 0) {
        return !isTopicUnlocked(topicsCourses[0]);
      }
    }

    return true;
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
        {topicsCourses?.map((topic, topicIndex) => (
          <div
            key={topic.sequentialTopic}
            className={styles["path-topicContainer"]}
          >
            <div className={styles["path-border"]}>
              {topicIndex === 0 ? (
                <FlagStartIcon
                  className={`${styles["path-flagIcon"]} ${styles["path-flagIcon_start"]}`}
                />
              ) : (
                ""
              )}
              {topicsCourses?.length - 1 === topicIndex ? (
                <FlagEndIcon
                  className={`${styles["path-flagIcon"]} ${styles["path-flagIcon_end"]}`}
                />
              ) : null}

              <button
                onClick={() => handleUrlId(topic)}
                className={styles["path-button"]}
                disabled={
                  !isTopicUnlocked(topic) && !isFirstTopicUnlocked(topicIndex)
                }
              >
                {selectedCourse?.mandatory && !isTopicUnlocked(topic) ? (
                  <IconBxLock />
                ) : (
                  <DavidStarIcon
                    className={styles["iconStartDavid-mandatory"]}
                  />
                )}
              </button>
            </div>
            <p className={styles["path-CourseTitle"]}>{topic.topicName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
