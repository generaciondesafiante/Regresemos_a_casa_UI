"use client";
import { useRouter } from "next/navigation";
import { Button, Input } from "../../atoms";
import styles from "./EditCourseTopicManage.module.css";
import { useAppSelector } from "../../../store/store";
import { useState } from "react";
import { updateCourse } from "../../../services/courses/updateCourse";
import { useSession } from "next-auth/react";

export const EditCourseTopicManage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.uid || "";
  // const dispatch = useAppDispatch();
  const course = useAppSelector((state) => state.courses.selectedCourse);
  const courseId = course?._id || "";
  console.log(course);
  const [formData, setFormData] = useState({
    nameCourse: course?.nameCourse || "",
    titleCourse: course?.titleCourse || "",
    typeOfRoute: course?.typeOfRoute || "tipo de recurso",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateCourseInfo = async () => {
    try {
      const response = await updateCourse(
        formData.nameCourse,
        formData.titleCourse,
        formData.typeOfRoute,
        userId,
        courseId
      );
      if (response.status !== 200) {
        throw new Error(response.data.message || "Error updating course");
      }
      router.push("/dashboard/adminPanel/courses/courseTopicManage");
    } catch (error) {
      console.error(error);
      alert("Error updating course");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCourseInfo();
  };

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
              router.push("/dashboard/adminPanel/courses");
            }}
            className={styles["button__cancel"]}
          >
            Cancelar
          </Button>
          <Button type="submit" className={styles["button__submit"]}>
            Guardar
          </Button>
        </div>
      </form>
    </main>
  );
};
