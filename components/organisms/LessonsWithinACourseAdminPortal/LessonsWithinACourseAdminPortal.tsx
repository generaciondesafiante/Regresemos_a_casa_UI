"use client";
import React from "react";
import { DynamicTable } from "../TableAdmin/TableAdmin";
import { Column } from "../../../types/types/tableAdmin";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import AdminPencilIcon from "../../atoms/icons/adminPanel/AdminPencilIcon";
import styles from "./LessonsWithinACourseAdminPortal.module.css";
import { ArrowBack } from "../../atoms/ArrowBack/ArrowBack";
import { useRouter } from "next/navigation";
import { resourceEditAdmin } from "../../../store/slices/resourceEditAdminSlice";
import Swal from "sweetalert2";

const columns: Column[] = [
  { key: "_id", label: "Id" },
  { key: "title", label: "Nombre de la lección" },
  { key: "typeResource", label: "Tipo" },
];

const dropdownOptions = ["todos", "video", "audio", "pdf", "imagen", "link"];

export const LessonsWithinACourseAdminPortal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);

  const selectedLesson = useAppSelector(
    (state) => state.resource.selectedResource
  );
  const rows = Array.isArray(selectedLesson)
    ? selectedLesson.map((lesson) => lesson._id)
    : selectedLesson
    ? [selectedLesson._id]
    : [];

  const handleEditClick = (row: any) => {
    if (row) {
      dispatch(resourceEditAdmin(row));
      router.push(
        "/dashboard/adminPanel/courses/courseTopicManage/lessonsWithinACourse/editLesson"
      );
    } else {
      Swal.fire({
        title: "Error al seleccionar el recurso",
        text: "Hablar con el equipo de desarrollo",
        icon: "warning",
        confirmButtonText: "Seleccionar",
        confirmButtonColor: "var(--turquoise)",
      });
    }
  };
  return (
    <main className={styles["container__lessonWithinCourse"]}>
      <ArrowBack
        linkBack={"/dashboard/adminPanel/courses/courseTopicManage"}
        text={"Regresar"}
        colorText={"white"}
        colorHover={"greenDesafiante"}
      />
      <div className={styles["lessonWithinCourse__title--container"]}>
        <section className={styles["lessonWithinCourse__title-topic--content"]}>
          <h2 className={styles["lessonWithinCourse__title"]}>
            {selectedTopic?.nameTopic}
          </h2>
          <div
            onClick={() => {
              router.push(
                "/dashboard/adminPanel/courses/courseTopicManage/editTopicWithinACourse"
              );
            }}
          >
            <AdminPencilIcon className={styles["title__icon"]} />
          </div>
        </section>
      </div>
      <section className={styles["lessonWithinCourse__table"]}>
        <DynamicTable
          columns={columns}
          rows={rows}
          actionButton={{ label: "Editar", icon: <AdminPencilIcon /> }}
          buttonCreateProps={{
            label: "Agregar lección",
            href: `/dashboard/adminPanel/courses/courseTopicManage/lessonsWithinACourse/createLesson`,
          }}
          dropdownOptions={dropdownOptions}
          dropdownColumnKey="typeResource"
          onEdit={handleEditClick}
          noDataMessage="No hay lecciones disponibles. Por favor, agrega nuevas lecciones."
        />
      </section>
    </main>
  );
};
