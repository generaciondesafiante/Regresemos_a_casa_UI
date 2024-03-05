"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import IconBxLock from "../../atoms/icons/lockPathIcon/PathLockIcon";
import IconBxLockOpen from "../../atoms/icons/unLockPathIcon/PathUnlockIcon";
import { FlagStartIcon } from "../../atoms/icons/flagsIcon/FlagStartIcon";
import { FlagEndIcon } from "../../atoms/icons/flagsIcon/FlagEndIcon";
import { DavidStarIcon } from "../../atoms/icons/davidStar/DavidStarIcon";
import { User } from "../../../types/types/user.type";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { selectTopic } from "../../../store/slices/topicsSlice";
import { userInfo } from "../../../store/slices/userSlice";
import { fetchUserData } from "../../../services/user/userData";
import styles from "./Path.module.css";
import { ArrowLeftIcon } from "../../atoms";
import Link from "next/link";

export const Path = () => {
  const { data: session } = useSession();
  const idUser = session?.user.uid;

  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );
  const [userInformation, setUserInformation] = useState<User | undefined>(
    undefined
  );
  const topicsCourses = selectedCourse?.topics;

  useEffect(() => {
    if (idUser) {
      const userData = async () => {
        const dataUser = await fetchUserData(idUser);
        setUserInformation(dataUser);
        dispatch(userInfo(dataUser));
      };
      userData();
    }
  }, [idUser]);

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
      <div className={styles["prueba1"]}>
        <div className={styles["containerBackButtonCourses"]}>
          <Link
            className={styles["backButtonCourses"]}
            href={`/dashboard/courses`}
          >
            <ArrowLeftIcon />
            <p>Regresar</p>
          </Link>
        </div>
        <h2 className={styles["path-title"]}>
          ¡Vamos de<span> regreso </span>a casa! <DavidStarIcon />
        </h2>
      </div>
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
