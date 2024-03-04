"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../atoms/Card/Card";
import { Course } from "../../../types/types/course.types";
import { useAppDispatch } from "../../../store/store";
import { selectCourse } from "../../../store/slices/courseSlice";
import { fetchCoursesData } from "../../../services/courses/coursesData";
import styles from "./Courses.module.css";

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await fetchCoursesData();
      setCourses(coursesData);
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
    dispatch(selectCourse(course));
    router.push(url);
  };

  return (
    <div className={styles["courses-container"]}>
      <div className={styles["courses-cardContainer"]}>
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
