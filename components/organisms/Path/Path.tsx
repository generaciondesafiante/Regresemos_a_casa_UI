"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Path.module.css";
import IconBxLock from "../../atoms/icons/lockPathIcon/PathLockIcon";
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
      <div className={styles["path-content"]}>
        {courses.map((course, index) => (
          <div key={course.id} className={styles["path-border"]}>
            {index === 0 && (
              <img
                className={`${styles["path-img_flag"]} ${styles["flag-start"]}`}
                src="https://i.imgur.com/pIOGRDs.png"
                alt="Bandera del inicio"
              />
            )}

            {index === courses.length - 1 && (
              <img
                className={`${styles["path-img_flag"]} ${styles["flag-end"]}`}
                src="https://i.imgur.com/8cfdvwv.png"
                alt="Bandera de la meta"
              />
            )}

            <button
              onClick={() => handleUrlId(course)}
              className={styles["path-learningPath"]}
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
