"use client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button, Input } from "../../atoms";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useState, useEffect } from "react";
import { updateCourse } from "../../../services/courses/updateCourse";
import { useSession } from "next-auth/react";
import styles from "./EditCourseTopicManage.module.css";
import { fetchCoursesData } from "../../../services/courses/coursesData";
import { selectCourse } from "../../../store/slices/courseSlice";
import { deleteCourse } from "../../../services/courses/deleteCourse";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";
import DeleteIcon from "../../atoms/icons/deleteIcon/DeleteIcon";
import { LoadingTemplate } from "../../templates";

export const EditCourseTopicManage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const userId = session?.user.uid || "";
  const course = useAppSelector((state) => state.courses.selectedCourse);
  const courseId = course?._id || "";

  const [formData, setFormData] = useState({
    nameCourse: course?.nameCourse || "",
    titleCourse: course?.titleCourse || "",
    typeOfRoute: course?.typeOfRoute || "tipo de recurso",
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const modifiedFields = getModifiedFields();
    setHasChanges(Object.keys(modifiedFields).length > 0);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };
      const modifiedFields = getModifiedFields(newFormData);
      setHasChanges(Object.keys(modifiedFields).length > 0);
      return newFormData;
    });
  };

  const getModifiedFields = (newFormData = formData) => {
    const modifiedFields: { [key: string]: string } = {};
    if (newFormData.nameCourse !== course?.nameCourse) {
      modifiedFields.nameCourse = newFormData.nameCourse;
    }
    if (newFormData.titleCourse !== course?.titleCourse) {
      modifiedFields.titleCourse = newFormData.titleCourse;
    }
    if (newFormData.typeOfRoute !== course?.typeOfRoute) {
      modifiedFields.typeOfRoute = newFormData.typeOfRoute;
    }
    return modifiedFields;
  };

  const updateCourseInfo = async () => {
    const modifiedFields = getModifiedFields();
    if (Object.keys(modifiedFields).length === 0) {
      alert("No hay cambios para guardar");
      Swal.fire({
        title: "No hay cambios para guardar",
        icon: "info",
      });
      return;
    }

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
          const response = await updateCourse(
            modifiedFields.nameCourse,
            modifiedFields.titleCourse,
            modifiedFields.typeOfRoute,
            userId,
            courseId
          );

          if (response.status !== 200) {
            Swal.fire({
              icon: "error",
              title: "Error al editar el curso",
              text: "El curso no ha editado correctamente.",
            });
          }

          Swal.fire({
            icon: "success",
            title: "Curso editado",
            text: "El curso editado correctamente.",
          });
          const course = async () => {
            const data = await fetchCoursesData();
            if (data) {
              const selectedCourse = data.filter(
                (data: any) => data._id === courseId
              );
              dispatch(selectCourse(selectedCourse[0]));
            }
          };

          course();

          router.push("/dashboard/adminPanel/courses/courseTopicManage");
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "info",
            title: "Acción cancelada",
            text: "El curso no ha editado.",
          });
        }
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCourseInfo();
  };

  const handleDeleteCourse = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas confirmar la eliminación del curso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--turquoise)",
      cancelButtonColor: "var(--red)",
      confirmButtonText: "Sí, eliminar curso",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resposeData = await deleteCourse(userId, courseId);
          if (resposeData.status !== 200) {
            Swal.fire({
              icon: "error",
              title: "Error al eliminar el curso",
              text: "El curso no ha eliminado correctamente.",
            });
          }

          Swal.fire({
            icon: "success",
            title: "Curso eliminado",
            text: "El curso se ha eliminado correctamente.",
          });
          router.push("/dashboard/adminPanel/courses");
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "info",
            title: "Acción cancelada",
            text: "El curso no ha eliminado.",
          });
        }
      }
    });
  };

  if (!course?.nameCourse) {
    return <LoadingTemplate/>; 
  }

  return (
    <main className={styles["createCourse"]}>
      <h2 className={styles["createCourse__title"]}>Editar curso</h2>
      <form className={styles["createCourse__form"]} onSubmit={handleSubmit}>
        <Input
          label="Nombre del curso"
          placeholder=""
          inputColor="var(--white)"
          borderColor="var(--turquoise)"
          name="nameCourse"
          onChange={handleChange}
          value={formData.nameCourse}
        />
        <Input
          label="Título del curso"
          placeholder=""
          inputColor="var(--white)"
          borderColor="var(--turquoise)"
          name="titleCourse"
          onChange={handleChange}
          value={formData.titleCourse}
        />
        <div className={styles["container__input"]}>
          <select
            className={styles.inputOptions}
            name="typeOfRoute"
            onChange={handleChange}
            value={formData.typeOfRoute}
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
              router.push("/dashboard/adminPanel/courses/courseTopicManage");
            }}
            className={styles["button__cancel"]}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className={styles["button__submit"]}
            disabled={!hasChanges}
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
            Eliminar curso
            <DeleteIcon className={styles["icon__delete-course"]} />
          </Button>
        </div>
      </form>
    </main>
  );
};
