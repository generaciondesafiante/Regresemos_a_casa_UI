"use client";
import React, { useState, useEffect, FormEvent } from "react";
import styles from "./CreateCourseAdminPanel.module.css";
import { Button, Input } from "../../atoms";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { createCourse } from "../../../services/courses/createCourse";
import { useRouter } from "next/navigation";

interface CourseState {
  nameCourse: string;
  titleCourse: string;
  typeCourse: string;
}

export const CreateCourseAdminPanel: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user.uid;
  const [course, setCourse] = useState<CourseState>({
    nameCourse: "",
    titleCourse: "",
    typeCourse: "",
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const { nameCourse, titleCourse, typeCourse } = course;
    if (
      nameCourse &&
      titleCourse &&
      typeCourse &&
      typeCourse !== "tipo de recurso"
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [course]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = (): boolean => {
    const { nameCourse, titleCourse, typeCourse } = course;

    const nameCourseValid = nameCourse.length >= 3;
    const titleCourseValid = titleCourse.length >= 3;

    if (!nameCourseValid) {
      Swal.fire({
        icon: "error",
        title: "Nombre del curso inválido",
        text: "El nombre del curso debe tener al menos 3 caracteres.",
      });
      return false;
    }

    if (!titleCourseValid) {
      Swal.fire({
        icon: "error",
        title: "Título del curso inválido",
        text: "El título del curso debe tener al menos 3 caracteres.",
      });
      return false;
    }

    if (typeCourse === "tipo de recurso") {
      Swal.fire({
        icon: "error",
        title: "Tipo de ruta no seleccionado",
        text: "Por favor, selecciona un tipo de ruta válido.",
      });
      return false;
    }

    return true;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateInputs()) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas confirmar la creación del curso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--turquoise)",
        cancelButtonColor: "var(--red)",
        confirmButtonText: "Sí, crear curso",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { nameCourse, titleCourse, typeCourse } = course;

            const courseData = await createCourse(
              nameCourse,
              titleCourse,
              typeCourse,
              userId || ""
            );
            console.log(courseData);
            if (courseData.status === 201) {
              Swal.fire({
                icon: "success",
                title: "Curso creado",
                text: "El curso ha sido agregado correctamente.",
              });
              router.push("/dashboard/adminPanel/courses");
            } else {
              Swal.fire({
                icon: "error",
                title: "Error al crear el curso",
                text: "El curso no ha sido creado correctamente.",
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ocurrió un error al crear el curso.",
            });
          }
        } else {
          Swal.fire({
            icon: "info",
            title: "Acción cancelada",
            text: "El curso no ha sido creado.",
          });
        }
      });
    }
  };
  return (
    <main className={styles["createCourse"]}>
      <h2 className={styles["createCourse__title"]}>Agregar curso</h2>
      <form className={styles["createCourse__form"]} onSubmit={onSubmit}>
        <Input
          label="Nombre del curso"
          placeholder=""
          inputColor="var(--white)"
          borderColor="var(--turquoise)"
          name="nameCourse"
          onChange={handleChange}
          value={course.nameCourse}
        />
        <Input
          label="Título del curso"
          placeholder=""
          inputColor="var(--white)"
          borderColor="var(--turquoise)"
          name="titleCourse"
          onChange={handleChange}
          value={course.titleCourse}
        />
        <div className={styles["container__input"]}>
          <select
            className={styles.inputOptions}
            name="typeCourse"
            onChange={handleChange}
            value={course.typeCourse}
          >
            <option
              value="tipo de recurso"
              className={styles["input__option__select"]}
            >
              Tipo de ruta
            </option>
            <option value="strict" className={styles["input__option__select"]}>
              Estricta (tiene un orden establecido)
            </option>
            <option
              value="flexible"
              className={styles["input__option__select"]}
            >
              Flexible (no tiene un orden establecido)
            </option>
          </select>
        </div>
        <div className={styles["createCourse__content--button"]}>
          <Button
            onClick={() => {
              router.push("/dashboard/adminPanel/courses");
            }}
            className={styles["button__cancel"]}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid}
            className={styles["button__submit"]}
          >
            Guardar
          </Button>
        </div>
      </form>
    </main>
  );
};
