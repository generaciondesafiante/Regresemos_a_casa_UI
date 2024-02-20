"use client";
import { useParams, useRouter } from "next/navigation";
import IconBxLock from "../../atoms/icons/lockPathIcon/PathLockIcon";
import { FlagStartIcon } from "../../atoms/icons/flagsIcon/FlagStartIcon";
import { FlagEndIcon } from "../../atoms/icons/flagsIcon/FlagEndIcon";
import { DavidStarIcon } from "../../atoms/icons/davidStar/DavidStarIcon";
import { useAppSelector } from "../../../store/store";
import styles from "./Path.module.css";

export const Path = () => {
  const router = useRouter();
  const selectedCourse = useAppSelector((state) => state.course.selectedCourse);
  const topicsCourses = selectedCourse?.topics;

  const handleUrlId = (topic: any) => {
    const topicName = topic.topicName
      .replace(/\s+/g, "_")
      .replace(/́/g, "")
      .replace(/ñ/g, "n")
      .toLowerCase();

    //  todo revisar las lecciones antes de dar push
    const lessonId = topic.lessons[0].videoId;
    const url = `/dashboard/courses/${topicName}/${topic._id}/${lessonId}/${topicName}/${topic.sequentialTopic}`;
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
              >
                {selectedCourse?.mandatory ? (
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
