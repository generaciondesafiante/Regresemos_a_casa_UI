"use client";
import React, { useEffect, useState } from "react";
import { Column } from "../../../types/types/tableAdmin";
import { fetchCoursesData } from "../../../services/courses/coursesData";
import { useSession } from "next-auth/react";
import { DynamicTable } from "../TableAdmin/TableAdmin";
import styles from "./CoursesAdminPanel.module.css";
import { ArrowBack } from "../../atoms/ArrowBack/ArrowBack";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../../store/store";
import Swal from "sweetalert2";
import { selectCourse } from "../../../store/slices/courseSlice";
import ConfigIcon from "../../atoms/icons/adminPanel/ConfigIcon";
import { allTopicWithinACourse } from "../../../store/slices/allTopicwithinCourseSlice";

const columns: Column[] = [
  { key: "_id", label: "Id" },
  { key: "nameCourse", label: "Nombre del curso" },
];

export const CourseAdminPanel = () => {
  const { data: session } = useSession();
  const userId = session?.user.uid;
  const [courseData, setcourseData] = useState([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dataResource = async () => {
      if (userId) {
        const data = await fetchCoursesData();
        setcourseData(data);
      }
    };
    dataResource();
  }, [userId]);

  const handleEditClick = (row: any) => {
    const course = row;
    const topics = row.topic;
    if (topics) {
      dispatch(allTopicWithinACourse(topics));
      dispatch(selectCourse(course));
    } else {
      Swal.fire(
        "Error",
        "Error para poder editar el recurso, consulte con el administrador.",
        "error"
      );
    }

    router.push(`/dashboard/adminPanel/courses/courseTopicManage`);
  };

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
        actionButton={{ label: "Administrar", icon: <ConfigIcon className={styles['iconButton__table']}/> }}
        onEdit={handleEditClick}
      />
    </main>
  );
};
