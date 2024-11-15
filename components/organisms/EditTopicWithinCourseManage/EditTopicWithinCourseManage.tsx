"use client";
import React, { useState } from "react";
import { Button, Input } from "../../atoms";
import { useRouter } from "next/navigation";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";
import DeleteIcon from "../../atoms/icons/deleteIcon/DeleteIcon";
import styles from "./EditTopicWithinCourseManage.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import Swal from "sweetalert2";
import { updateTopicWithinCourse } from "../../../services/courses/topicOnCourse/updateTopicWithinCourse";
import { useSession } from "next-auth/react";
import { deleteTopicWithinCourse } from "../../../services/courses/topicOnCourse/deleteTopicWithinCourse";
import { allTopicWithinACourse } from "../../../store/slices/allTopicwithinCourseSlice";
import { selectTopic } from "../../../store/slices/topicsSlice";
import { showNotification } from "../../../store/slices/notificationSlice ";

export const EditTopicWithinCourseManage = () => {
  const [value, setValue] = useState("");
  const { data: sesion } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userId = sesion?.user.uid;

  const courseId = useAppSelector((state) => state.courses.selectedCourse?._id);
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  const topicId = selectedTopic?._id;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas confirmar la edición del curso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--turquoise)",
      cancelButtonColor: "var(--red)",
      confirmButtonText: "Sí, editar curso",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const nameTopic = value;
          const response = await updateTopicWithinCourse(
            nameTopic,
            userId || "",
            courseId || "",
            topicId || ""
          );

          if (response.status !== 200) {
            Swal.fire({
              icon: "error",
              title: "Error al editar el tema",
              text: "El tema no se ha editado correctamente.",
            });
          } else if (response.status === 200) {
            dispatch(selectTopic(response.data));
            dispatch(showNotification("Tema editado"));
            router.push(
              "/dashboard/adminPanel/courses/courseTopicManage/lessonsWithinACourse"
            );
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "info",
            title: "Acción cancelada",
            text: "El tema no se ha editado.",
          });
        }
      }
    });
  };

  const handleDeleteCourse = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas confirmar la eliminación del tema?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--turquoise)",
      cancelButtonColor: "var(--red)",
      confirmButtonText: "Sí, eliminar tema",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resposeData = await deleteTopicWithinCourse(
            userId || "",
            courseId || "",
            topicId || ""
          );
          if (resposeData.status !== 200) {
            Swal.fire({
              icon: "error",
              title: "Error al eliminar el tema",
              text: "El tema no ha eliminado correctamente.",
            });
          } else if (resposeData.status === 200) {
            dispatch(allTopicWithinACourse(resposeData.data.course.topic));
            Swal.fire({
              icon: "success",
              title: "Tema eliminado",
              text: "El tema se ha eliminado correctamente.",
            });
            router.push("/dashboard/adminPanel/courses/courseTopicManage");
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "info",
            title: "Acción cancelada",
            text: "El tema no ha eliminado.",
          });
        }
      }
    });
  };

  return (
    <main className={styles["edit-topic__container"]}>
      <h2 className={styles["edit-topic__title"]}>Editar tema</h2>
      <form className={styles["edit-topic__form"]} onSubmit={handleSubmit}>
        <Input
          label="Nombre del tema"
          placeholder=""
          inputColor="var(--white)"
          borderColor="var(--turquoise)"
          name="nameCourse"
          onChange={handleChange}
          value={value || selectedTopic?.nameTopic}
        />
        <div className={styles["edit-topic__content--button"]}>
          <Button
            onClick={() => {
              router.push("/dashboard/adminPanel/courses/courseTopicManage");
            }}
            className={styles["button__cancel"]}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className={styles["button__submit"]}
            disabled={!value}
          >
            Guardar
            <AddCircleIcon className={styles["editCourse__addIcon"]} />
          </Button>
        </div>
        <hr className={styles["button__split"]} />
        <div className={styles["button__content-delete-course"]}>
          <Button
            className={styles["button__delete-course"]}
            onClick={() => {
              handleDeleteCourse();
            }}
          >
            Eliminar tema
            <DeleteIcon className={styles["icon__delete-course"]} />
          </Button>
        </div>
      </form>
    </main>
  );
};
