"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import IconBxLock from "../../atoms/icons/lockPathIcon/PathLockIcon";
import { FlagStartIcon } from "../../atoms/icons/flagsIcon/FlagStartIcon";
import { FlagEndIcon } from "../../atoms/icons/flagsIcon/FlagEndIcon";
import { DavidStarIcon } from "../../atoms/icons/davidStar/DavidStarIcon";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { selectTopic } from "../../../store/slices/topicsSlice";
import styles from "./Path.module.css";
import IconBxLockOpen from "../../atoms/icons/unLockPathIcon/PathUnlockIcon";

export const Path = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );
  const userInformation = useAppSelector((state) => state.user.userInfo);
  const topicsCourses = selectedCourse?.topics;

  useEffect(() => {
    // Verificar el estado de desbloqueo de los topics al montar el componente
    topicsCourses?.forEach((topic) => {
      const unlocked = isTopicUnlocked(topic);
      console.log(`El topic ${topic.topicName} está desbloqueado: ${unlocked}`);
    });
  }, []);

  const isTopicUnlocked = (topic: any) => {
    // Verificamos si hay información en el progreso del curso del usuario
    if (userInformation?.CourseProgress) {
      // Buscamos el progreso correspondiente al curso y al topic
      const progress = userInformation?.CourseProgress.find((progress: any) => {
        return (
          progress.idCourse === selectedCourse?._id &&
          progress.topics.some(
            (progressTopic: any) => progressTopic.idTopic === topic._id
          )
        );
      });

      // Si encontramos el progreso, determinamos si el topic está desbloqueado
      if (progress) {
        const sequentialTopic = parseInt(progress.sequentialTopic);
        return sequentialTopic >= parseInt(topic.sequentialTopic);
      }
    }

    // Si no hay información de progreso o no se encontró progreso, el topic está bloqueado
    return false;
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
          // Determinar si el topic está desbloqueado
          const isUnlocked = isTopicUnlocked(topic);

          // Determinar si el curso es obligatorio y si el primer topic está desbloqueado
          const isFirstTopicUnlocked = selectedCourse?.mandatory
            ? topicIndex === 0 || isUnlocked
            : true;

          return (
            <div
              key={topic.sequentialTopic}
              className={styles["path-topicContainer"]}
            >
              <div className={styles["path-border"]}>
                {/* Renderizar icono de inicio de topic si es el primer topic */}
                {topicIndex === 0 && (
                  <FlagStartIcon
                    className={`${styles["path-flagIcon"]} ${styles["path-flagIcon_start"]}`}
                  />
                )}

                {/* Renderizar icono de fin de topic si es el último topic */}
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
                  {/* Renderizar icono según el estado de desbloqueo */}
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
