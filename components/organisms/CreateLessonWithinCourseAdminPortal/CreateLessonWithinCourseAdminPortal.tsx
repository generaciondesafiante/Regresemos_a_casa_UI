"use client";
import React, { useEffect, useState } from "react";
import styles from "./CreateLessonWithinCourseAdminPortal.module.css";
import { Button } from "../../atoms";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";
import AdminPencilIcon from "../../atoms/icons/adminPanel/AdminPencilIcon";
import { motion, AnimatePresence } from "framer-motion";
import { fetchResourcesData } from "../../../services/resources/resources";
import { useSession } from "next-auth/react";
import { Resource } from "../../../types/types/Resources";
import { useRouter } from "next/navigation";
import { addLessonWithinTopic } from "../../../services/courses/lessonOnTopic/addLessonWithinTopic";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import Swal from "sweetalert2";
import { selectedResource } from "../../../store/slices/ResourceSlice";
import { resourceEditAdmin } from "../../../store/slices/resourceEditAdminSlice";

export const CreateLessonWithinCourseAdminPortal = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResourceData, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedType, setSelectedType] = useState("tipo de recurso");
  const courseId = useAppSelector((state) => state.courses.selectedCourse?._id);
  const topicId = useAppSelector((state) => state.topics.selectedTopic?._id);

  useEffect(() => {
    const fetch = async () => {
      const idUser = session?.user.uid;
      const data = await fetchResourcesData(idUser || "");
      if (Array.isArray(data.resources)) {
        setResources(data.resources);
      } else {
        setResources([]);
      }
    };
    fetch();
  }, [session?.user.uid]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsModalOpen(false);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const filteredResources = resources
    .filter(
      (resource: Resource) =>
        selectedType === "tipo de recurso" ||
        resource.typeResource === selectedType
    )
    .filter((resource: Resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = session?.user.uid;
    const resourceId = selectedResourceData?._id;
    Swal.fire({
      title: "¿Estás seguro de agregar el recurso a este tema?",
      text: "Se agregará el recurso a este tema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardarlo",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--turquoise)",
      cancelButtonColor: "var(--red)",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const data = await addLessonWithinTopic(
            userId || "",
            courseId || "",
            topicId || "",
            resourceId || ""
          );
          if (data.status === 201) {
            dispatch(selectedResource(data.data));
            Swal.fire({
              icon: "success",
              title: "Lección agreagada",
              text: "La lección se ha agregado correctamente.",
            });
            router.push(
              "/dashboard/adminPanel/courses/courseTopicManage/lessonsWithinACourse"
            );
          } else {
            Swal.fire("Error", `${data.data.error}`, "error");
          }
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error",
            "Hubo un problema al agregar el recurso correctamente.",
            "error"
          );
        }
      }
    });
  };
  const handleEditClick = () => {
    if (selectedResourceData) {
      router.push(
        `/dashboard/adminPanel/resources/editResource/${selectedResourceData._id}`
      );
      dispatch(resourceEditAdmin(selectedResourceData));
    } else {
      Swal.fire({
        title: "Selecciona un recurso para editar.",
        text: "No has seleccionado ningún recurso.",
        icon: "warning",
        confirmButtonText: "Seleccionar",
        confirmButtonColor: "var(--turquoise)",
      });
    }
  };

  return (
    <main className={styles["createCourse"]}>
      <h2 className={styles["createCourse__title"]}>Agregar lección</h2>
      <form className={styles["createCourse__form"]} onSubmit={onSubmit}>
        <div className={styles["container__input"]}>
          <h3 className={styles["subtitle__input"]}>
            Filtrar por tipo de recurso
          </h3>
          <select
            className={styles.inputOptions}
            name="typeOfRoute"
            onChange={handleTypeChange}
          >
            <option
              value="tipo de recurso"
              className={styles["input__option__select"]}
            >
              Tipo de recurso
            </option>
            <option value="video" className={styles["input__option__select"]}>
              Video
            </option>
            <option value="audio" className={styles["input__option__select"]}>
              Audio
            </option>
            <option value="image" className={styles["input__option__select"]}>
              Imagen
            </option>
            <option value="pdf" className={styles["input__option__select"]}>
              PDF
            </option>
            <option value="link" className={styles["input__option__select"]}>
              Link
            </option>
          </select>
        </div>
        <div className={styles["container__input"]}>
          <h3 className={styles["subtitle__input"]}>Seleccionar recurso</h3>
          <input
            type="text"
            value={selectedResourceData?.title || "Seleccionar Recurso"}
            readOnly
            className={styles.inputOptions}
            onClick={toggleModal}
          />
        </div>
        <div className={styles["createCourse__content--button"]}>
          <Button
            className={styles["button__cancel"]}
            onClick={() =>
              router.push(
                "/dashboard/adminPanel/courses/courseTopicManage/lessonsWithinACourse"
              )
            }
          >
            Cancelar
          </Button>
          <Button type="submit" className={styles["button__submit"]}>
            Guardar
            <AddCircleIcon className={styles["editCourse__addIcon"]} />
          </Button>
        </div>
        <hr className={styles["button__split"]} />
        <div className={styles["button__content-delete-course"]}>
          <Button
            className={styles["button__submit"]}
            onClick={handleEditClick}
          >
            Editar recurso
            <AdminPencilIcon className={styles["icon__delete-course"]} />
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {isModalOpen && (
          <div className={styles["modal-backdrop"]} onClick={toggleModal}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                placeholder="Buscar recurso..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles["search-bar"]}
              />
              <div className={styles["resource-list"]}>
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource) => (
                    <div
                      key={resource._id}
                      className={styles["resource-item"]}
                      onClick={() => handleResourceClick(resource)}
                    >
                      {resource.title}
                    </div>
                  ))
                ) : (
                  <p className={styles["no-data-message"]}>
                    No hay recursos disponibles.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};
