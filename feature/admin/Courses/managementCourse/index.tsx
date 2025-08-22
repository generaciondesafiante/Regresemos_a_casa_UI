"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/atoms";
import Button from "@/shared/components/Button/Button";
import { Select } from "@/shared/components/Select";
import { Divider } from "@/shared/components/Divider";
import { Alert } from "@/shared/components/ModalAlerts";

import { schema, FormData } from "./schema";

import styles from "./styles.module.css";
import Text from "@/shared/components/Text";
import { useSession } from "next-auth/react";
import { allCoursesTableService } from "@/shared/services/admin/courses/allCourses";
import { TypeOfRouteCourse } from "@/types/admin/courses/createCourse-type";

const options = [
  { value: "strict", label: "Ruta estricta" },
  { value: "flexible", label: "Ruta flexible" },
];

type AlertState = {
  type: "success" | "error" | "warning";
  title: string;
  subtitle: string;
  primaryButton?: { text: string; onClick: () => void };
  secondaryButton?: { text: string; onClick: () => void };
};

export const CreateCourseAdminPanel = () => {
  const { idCourse } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    type: "success",
    title: "",
    subtitle: "",
  });
  const router = useRouter();
  const { data: session } = useSession();
  const idUser = session?.user?.uid || null;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (idCourse) {
      const GetCourse = async () => {
        const response = await allCoursesTableService.getCourseById(
          idCourse as string
        );
        reset({
          nameCourse: response.nameCourse,
          titleCourse: response.titleCourse,
          typeOfRoute: response.typeOfRoute,
        });
        console.log("Curso obtenido:", response);
      };
      GetCourse();
    }
  }, [idCourse]);

  const handleShowAlert = (
    type: AlertState["type"],
    title: string,
    subtitle: string
  ) => {
    setAlert({
      type,
      title,
      subtitle,
      primaryButton: {
        text: "Aceptar",
        onClick: () => router.push("/dashboard/adminPanel/courses"),
      },
    });
    setShowAlert(true);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        typeOfRoute: data.typeOfRoute as TypeOfRouteCourse,
      };

      const isUpdating = !!idCourse;

      const response = isUpdating
        ? await allCoursesTableService.updateCourse(idCourse as string, payload)
        : await allCoursesTableService.createCourse(payload, idUser);

      if (response) {
        const successTitle = isUpdating
          ? "Curso actualizado exitosamente"
          : "Curso creado exitosamente";
        const successSubtitle =
          "Este curso se verá reflejado en la plataforma automáticamente.";
        handleShowAlert("success", successTitle, successSubtitle);
      }
    } catch (error) {
      const isUpdating = !!idCourse;
      const errorTitle = isUpdating
        ? "Error al actualizar el curso"
        : "Error al crear el curso";
      const errorSubtitle = "Por favor, inténtalo de nuevo más tarde.";
      handleShowAlert("error", errorTitle, errorSubtitle);
    }
  };

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
        <div className={styles["createCourse__content--button"]}>
          <Button
            onClick={() => {
              router.back();
            }}
            className={styles["button__cancel"]}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            icon="LuPlus"
            iconPosition="right"
            sizeIcon={24}
          >
            {idCourse ? "Actualizar" : "Crear"}
          </Button>
        </div>
        {idCourse && (
          <div className={styles["createCourse__delete"]}>
            <Divider />
            <Button
              type="submit"
              className={styles["button__submit--delete"]}
              icon="LuTrash"
              iconPosition="right"
              sizeIcon={24}
            >
              Eliminar curso
            </Button>
          </div>
        )}
      </form>
      {showAlert && (
        <Alert
          type={alert.type}
          title={alert.title}
          subtitle={alert.subtitle}
          primaryButton={alert.primaryButton}
          secondaryButton={alert.secondaryButton}
        />
      )}
    </main>
  );
};
