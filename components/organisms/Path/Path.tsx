"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import IconBxLock from "../../atoms/icons/lockPathIcon/PathLockIcon";
import IconBxLockOpen from "../../atoms/icons/unLockPathIcon/PathUnlockIcon";
import { FlagStartIcon } from "../../atoms/icons/flagsIcon/FlagStartIcon";
import { FlagEndIcon } from "../../atoms/icons/flagsIcon/FlagEndIcon";
import { DavidStarIcon } from "../../atoms/icons/davidStar/DavidStarIcon";
import { CourseProgress, User } from "../../../types/types/user.type";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { selectTopic } from "../../../store/slices/topicsSlice";
import { userInfo } from "../../../store/slices/userSlice";
import { fetchUserData } from "../../../services/user/userData";
import styles from "./Path.module.css";
import { ArrowLeftIcon } from "../../atoms";
import Link from "next/link";
import { selectedResource } from "../../../store/slices/ResourceSlice";
import { Resource } from "../../../types/types/Resources";

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

  const topicsCourses = selectedCourse?.topic;

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

  const isTopicUnlocked = (topic: any, topicIndex: any) => {
    if (selectedCourse && userInformation?.CourseProgress) {
      const courseProgress = userInformation.CourseProgress.find(
        (progress) => progress.course === selectedCourse._id
      );

      if (courseProgress) {
        const completedTopics = courseProgress.topics
          ? courseProgress.topics.filter((topicProgress) =>
              topicProgress.resources.some((resource) => resource.viewResource)
            )
          : [];

        return topicIndex <= completedTopics.length;
      } else {
        return topicIndex === 0;
      }
    } else {
      return selectedCourse?.typeOfRoute === "strict" && topicIndex === 0;
    }
  };

  const handleUrlId = (topic: any) => {
    const nameCourse = selectedCourse?.nameCourse
      .replace(/\s+/g, "_")
      .replace(/́/g, "")
      .replace(/ñ/g, "n")
      .toLowerCase();
    const nameTopic = topic.nameTopic
      .replace(/\s+/g, "_")
      .replace(/́/g, "")
      .replace(/ñ/g, "n")
      .toLowerCase();
    const resource = topic.resources[0];
    const resourceId = resource?._id?._id;
    const url = `/dashboard/courses/${nameCourse}/${selectedCourse?._id}/${resourceId}/${nameTopic}/1`;
    if (resource) {
      dispatch(selectedResource(resource));
    }

    dispatch(selectTopic(topic));
    router.push(url);
  };

  return (
    <div className={styles["path-container"]}>
      <div className={styles["containerBackReturnCourses"]}>
        <Link
          className={styles["backReturnCourses"]}
          href={`/dashboard/courses`}
        >
          <ArrowLeftIcon />
          <p>Regresar</p>
        </Link>
      </div>
      <div className={styles["content-title"]}>
        <h2 className={styles["path-title"]}>
          ¡Vamos de<span> regreso </span>a casa! <DavidStarIcon />
        </h2>
      </div>
      <div className={styles["path-content"]}>
        {topicsCourses?.map((topic, topicIndex) => {
          const isUnlocked = isTopicUnlocked(topic, topicIndex);
          return (
            <div key={topic._id} className={styles["path-topicContainer"]}>
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
                  disabled={
                    selectedCourse?.typeOfRoute === "strict" && !isUnlocked
                  }
                >
                  {selectedCourse?.typeOfRoute === "strict" ? (
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
              <p className={styles["path-CourseTitle"]}>{topic.nameTopic}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
