"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../atoms/Card/Card";
import { Course } from "../../../types/types/course.types";
import styles from "./Courses.module.css";

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_COURSE_RESOURCES}/course/coursedata`
        );
        const json = await response.json();

        if (json.ok && Array.isArray(json.courses)) {
          setCourses(json.courses);
        } else {
          console.error("Invalid courses data:", json.courses);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUrlId = (course: any) => {
    const courseName = course.courseName
      .replace(/\s+/g, "_")
      .replace(/́/g, "")
      .replace(/ñ/g, "n")
      .toLowerCase();

    const url = `/dashboard/courses/${courseName}/${course._id}`;

    router.push(url);
  };

  return (
    <div className={styles["course-container"]}>
      <div className={styles["card-container"]}>
        {courses.map((course) => (
          <div key={course._id}>
            <Card
              title={course.courseName}
              onNextVideoClick={() => handleUrlId(course)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
