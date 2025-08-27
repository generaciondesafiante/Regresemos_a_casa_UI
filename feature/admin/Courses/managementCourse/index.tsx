// CreateCourseAdminPanel.tsx
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/atoms";
import Button from "@/shared/components/Button/Button";
import { Select } from "@/shared/components/Select";

import { schema, FormData } from "./schema";

import styles from "./styles.module.css";
import Text from "@/shared/components/Text";
import { AlertModal } from "@/shared/components/ModalAlerts";
import { allCoursesTableService } from "@/shared/services/admin/courses/allCourses";
import { useSubmitCourse } from "../hooks/useSubmitManagementCourse";
import { TypeOfRouteCourse } from "@/types/admin/courses/createCourse-type";

const options = [
  { value: TypeOfRouteCourse.MANDATORY, label: "Ruta estricta" },
  { value: TypeOfRouteCourse.FLEXIBLE, label: "Ruta flexible" },
];

export const CreateCourseAdminPanel = () => {
  const { idCourse } = useParams();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { onSubmit, deleteCourse, showAlert, alert, closeAlert } =
    useSubmitCourse({
      idCourse: Array.isArray(idCourse) ? idCourse[0] : idCourse || undefined,
    });

  useEffect(() => {
    if (idCourse) {
      const fetchCourse = async () => {
        const courseId = Array.isArray(idCourse) ? idCourse[0] : idCourse;
        const response = await allCoursesTableService.getCourseById(courseId);
        reset({
          nameCourse: response.nameCourse,
          titleCourse: response.titleCourse,
          typeOfRoute: response.typeOfRoute as TypeOfRouteCourse,
        });
      };
      fetchCourse();
    }
  }, [idCourse, reset]);

  return (
    <main className={styles["createCourse"]}>
      <Text variant="h2" color="white">
        {idCourse ? "Actualizar curso" : "Crear curso"}
      </Text>

      <form
        className={styles["createCourse__form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Nombre del curso"
          placeholder=""
          inputColor="var(--white)"
          borderColor="var(--turquoise)"
          name="nameCourse"
          register={register("nameCourse")}
          error={errors.nameCourse}
        />
        <Input
          label="Título del curso"
          placeholder=""
          inputColor="var(--white)"
          borderColor="var(--turquoise)"
          name="titleCourse"
          register={register("titleCourse")}
          error={errors.titleCourse}
        />
        <div className={styles["container__input"]}>
          <Controller
            control={control}
            name="typeOfRoute"
            render={({ field }) => (
              <Select
                placeholder="Selecciona una opción tipo de ruta"
                label="Tipo de ruta"
                id="typeOfRoute"
                options={options}
                value={field.value}
                onChange={field.onChange}
                error={errors.typeOfRoute}
                borderColor="var(--turquoise)"
              />
            )}
          />
        </div>

        <Button type="submit" icon="LuPlus" iconPosition="right" sizeIcon={24}>
          {idCourse ? "Actualizar" : "Crear"}
        </Button>

        {idCourse && (
          <Button
            type="button"
            className={styles["button__submit--delete"]}
            icon="LuTrash"
            iconPosition="right"
            sizeIcon={24}
            variant="danger"
            onClick={deleteCourse}
          >
            Eliminar curso
          </Button>
        )}
      </form>

      <AlertModal
        isOpen={showAlert}
        onClose={closeAlert}
        type={alert.type}
        title={alert.title}
        subtitle={alert.subtitle}
        primaryButton={alert.primaryButton}
      />
    </main>
  );
};

export default CreateCourseAdminPanel;
