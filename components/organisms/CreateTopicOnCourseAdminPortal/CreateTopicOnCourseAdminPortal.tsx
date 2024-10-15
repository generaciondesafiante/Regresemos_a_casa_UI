"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "../../atoms";
import styles from "./CreateTopicOnCourseAdminPortal.module.css";
import { useParams, useRouter } from "next/navigation";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";
import Swal from "sweetalert2";
import { createTopicOnCourse } from "../../../services/courses/topicOnCourse/createTopicOnCourse";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "../../../store/store";
import { selectTopic } from "../../../store/slices/topicsSlice";

export const CreateTopicOnCourseAdminPortal = () => {
  const { idCourse } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const [nameTopic, setNameTopic] = useState("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const userId = session?.user.uid;
  useEffect(() => {
    if (nameTopic) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [nameTopic]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setNameTopic(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Swal.fire({
      title: "¿Estás seguro de crear un tema?",
      text: "Vas a crear un tema en este curso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardarlo",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--turquoise)",
      cancelButtonColor: "var(--red)",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const response = await createTopicOnCourse(
            nameTopic,
            userId || "",
            idCourse.toString()
          );
          if (response.status === 201) {
            dispatch(selectTopic(response.data.topic));

            Swal.fire({
              icon: "success",
              title: "Tema creado",
              text: "El tema ha sido creado correctamente.",
            });
            router.push("/dashboard/adminPanel/courses/courseTopicManage");
          } else {
            Swal.fire(
              "Error",
              "Hubo un problema al crear el cursos revisa que el curso este creado correctamente.",
              "error"
            );
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Hubo un problema al crear el cursos.", "error");
        }
      }
    });
  };

  return (
    <main className={styles["createTopic"]}>
      <section className={styles["containerTopic"]}>
        <h2 className={styles["createTopic__title"]}>Agregar tema</h2>
        <form className={styles["createTopic__form"]} onSubmit={onSubmit}>
          <Input
            label="Nombre del tema"
            placeholder=""
            inputColor="var(--white)"
            borderColor="var(--turquoise)"
            name="nameCourse"
            onChange={handleChange}
            value={nameTopic}
          />
          <div className={styles["creatTopic__content--button"]}>
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
              disabled={!isFormValid}
              className={styles["button__submit"]}
            >
              Guardar
              <AddCircleIcon className={styles["addTopicOnCourse__addIcon"]} />
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};
