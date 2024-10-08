"use client";
import React, { useEffect, useState } from "react";
import { Column, Row } from "../../../types/types/tableAdmin";
import { fetchCoursesData } from "../../../services/courses/coursesData";
import { useSession } from "next-auth/react";
import { DynamicTable } from "../TableAdmin/TableAdmin";
import styles from "./CoursesAdminPanel.module.css";
import { ArrowBack } from "../../atoms/ArrowBack/ArrowBack";

const columns: Column[] = [
  { key: "_id", label: "Id" },
  { key: "nameCourse", label: "Nombre del curso" },
];

export const CourseAdminPanel = () => {
  const { data: session } = useSession();
  const userId = session?.user.uid;
  const [courseData, setcourseData] = useState([]);

  useEffect(() => {
    const dataResource = async () => {
      if (userId) {
        const data = await fetchCoursesData();
        setcourseData(data);
      }
    };
    dataResource();
  }, [userId]);

  return (
    <main className={styles["container__coursesAdmin"]}>
      <ArrowBack
        linkBack={"/dashboard/adminPanel"}
        text={"Regresar"}
        colorText={"white"}
        colorHover={"greenDesafiante"}
      />

      <h2 className={styles["coursesAdmin__title"]}>Cursos</h2>
      <DynamicTable
        columns={columns}
        rows={courseData}
        buttonCreateProps={{
          label: "Agregar curso",
          href: "/dashboard/adminPanel/courses/createCourse",
        }}
        actionButton={{ label: "Administrar" }}
      />
    </main>
  );
};
