"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import IconBxLock from "../../atoms/icons/lockPathIcon/PathLockIcon";
import { FlagStartIcon } from "../../atoms/icons/flagsIcon/FlagStartIcon";
import { FlagEndIcon } from "../../atoms/icons/flagsIcon/FlagEndIcon";
import { DavidStarIcon } from "../../atoms/icons/davidStar/DavidStarIcon";
import { Course } from "../../../types/types/course.types";
import styles from "./Path.module.css";

export const Path = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { courseName, courseId } = useParams();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_COURSE_RESOURCES}/course/coursedata`
        );
        const json = await response.json();

        if (json.ok && Array.isArray(json.courses)) {
          const filteredCourses = json.courses.filter(
            (course: Course) => course._id === courseId
          );
          setCourses(filteredCourses);
        } else {
          console.error("Invalid courses data:", json.courses);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [courseId]);

  const handleUrlId = (topic: any) => {
    localStorage.setItem("idTopic", JSON.stringify(topic._id));
    const topicName = topic.topicName
      .replace(/\s+/g, "_")
      .replace(/́/g, "")
      .replace(/ñ/g, "n")
      .toLowerCase();

    const lessonId = topic.lessons[0].videoId;
    const defaultContentIndex = 0;

    const url = `/dashboard/courses/${courseName}/${courseId}/${lessonId}/${topicName}/${
      defaultContentIndex + 1
    }`;

    router.push(url);
  };

  return (
    <div className={styles["path-container"]}>
      <h2 className={styles["path-title"]}>
        ¡Vamos de<span> regreso </span>a casa! <DavidStarIcon />
      </h2>
      <div>
        {courses.map((course, courseIndex) => (
          <div key={courseIndex} className={styles["path-content"]}>
            {course.topics.map((topic, topicIndex) => (
              <div key={topicIndex} className={styles["path-border"]}>
                {topicIndex === 0 ? (
                  <FlagStartIcon
                    className={`${styles["path-flagIcon"]} ${styles["path-flagIcon_start"]}`}
                  />
                ) : (
                  ""
                )}
                {course.topics.length - 1 === topicIndex ? (
                  <FlagEndIcon
                    className={`${styles["path-flagIcon"]} ${styles["path-flagIcon_end"]}`}
                  />
                ) : null}

                <button
                  onClick={() => handleUrlId(topic)}
                  className={styles["path-button"]}
                >
                  <IconBxLock />
                </button>

                <p className={styles["path-CourseTitle"]}>{topic.topicName}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
