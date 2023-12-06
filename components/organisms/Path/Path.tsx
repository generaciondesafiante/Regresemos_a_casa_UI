"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Path.module.css";
import IconBxLock from "../../atoms/icons/lockPathIcon/PathLockIcon";
import { FlagStartIcon } from "../../atoms/icons/flagsIcon/FlagStartIcon";
import { FlagEndIcon } from "../../atoms/icons/flagsIcon/FlagEndIcon";
import { DavidStarIcon } from "../../atoms/icons/davidStar/DavidStarIcon";
import { Course } from "../../../types/types/course.types";

export const Path = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/coursedata`
      );
      const json = await response.json();
      setCourses(json.courses);
    };

    fetchData();
  }, []);

  const handleUrlId = (course: any) => {
    const defaultContentIndex = 0;
    const url = `/dashboard/path/course/${course.id}/${course.endpoint}/${
      defaultContentIndex + 1
    }`;
    router.push(url);
  };
  return (
    <div className={styles["path-container"]}>
      <h2 className={styles["path-title"]}>
        ¡Vamos de<span> regreso </span>a casa! <DavidStarIcon />
      </h2>
      <div className={styles["path-content"]}>
        {courses.map((course, index) => (
          <div key={course.id} className={styles["path-border"]}>
            {index === 0 && (
              <FlagStartIcon
                className={`${styles["path-flagIcon"]} ${styles["path-flagIcon_start"]}`}
              />
            )}

            {index === courses.length - 1 && (
              <FlagEndIcon
                className={`${styles["path-flagIcon"]} ${styles["path-flagIcon_end"]}`}
              />
            )}

            <button
              onClick={() => handleUrlId(course)}
              className={styles["path-button"]}
            >
              <IconBxLock />
            </button>
            <p className={styles["path-CourseTitle"]}>{course.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
