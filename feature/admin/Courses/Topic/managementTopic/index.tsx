"use client";
import styles from "./styles.module.css";
import { Input } from "@/shared/components/Input/Input";
import Button from "@/shared/components/Button/Button";
import Text from "@/shared/components/Text";
import { useParams } from "next/navigation";
import { useManagementTopic } from "../../hooks/topic/useManagementTopic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, FormData } from "../../hooks/topic/schema";
import { useSession } from "next-auth/react";
import { AlertModal } from "@/shared/components/ModalAlerts";
import { useEffect } from "react";
import { allTopicsCourseTableService } from "@/shared/services/admin/courses/topic";

export const ManagementTopic = () => {
  const { idTopic, idCourse } = useParams();
  console.log(idTopic);
  const { data: session } = useSession();

  const { onSubmit, onDeleteTopic, showAlert, alert, closeAlert } =
    useManagementTopic({
      idTopic: Array.isArray(idTopic) ? idTopic[0] : idTopic || undefined,
      courseId: Array.isArray(idCourse) ? idCourse[0] : idCourse || undefined,
      idUser: session?.user?.uid || null,
    });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (idTopic) {
      const fetchTopic = async () => {
        const response = await allTopicsCourseTableService.getTopicById(
          session?.user?.uid || "",
          Array.isArray(idTopic) ? idTopic[0] : idTopic || ""
        );
        reset({
          nameTopic: response.topic.nameTopic,
        });
      };
      fetchTopic();
    }
  }, [idCourse, idTopic, reset]);

  return (
    <main className={styles["edit-topic__container"]}>
      <Text variant="h2" color="white" bold>
        {!idTopic ? "Crear tema" : "Editar tema"}
      </Text>
      <form
        className={styles["edit-topic__form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Nombre del tema"
          placeholder=""
          inputColor="var(--white)"
          borderColor="var(--turquoise)"
          name="nameTopic"
          register={register("nameTopic")}
          error={errors.nameTopic}
        />
        <div className={styles["edit-topic__content--button"]}>
          <Button
            type="submit"
            className={styles["button__submit"]}
            onClick={() => {
              console.log("click");
            }}
          >
            {idTopic ? "Actualizar tema" : "Craer tema"}
          </Button>
        </div>
        <div className={styles["button__content-delete-course"]}>
          {idTopic && (
            <Button
              className={styles["button__delete-course"]}
              variant={"danger"}
              onClick={onDeleteTopic}
            >
              Eliminar tema
            </Button>
          )}
        </div>
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
