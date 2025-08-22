"use client";
import React, { useEffect, useState } from "react";
import Button from "@/shared/components/Button/Button";
import styles from "./EditLessonWithinATopic.module.css";
import AdminPencilIcon from "../atoms/icons/adminPanel/AdminPencilIcon";
import { AnimatePresence, motion } from "framer-motion";
import AddCircleIcon from "../atoms/icons/adminPanel/AddCircleIcon";
import { useAppSelector } from "../../store/store";
import { Resource } from "../../types/types/Resources";
import { fetchResourcesData } from "../../services/resources/resources";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { resourceEditAdmin } from "../../store/slices/resourceEditAdminSlice";
import { useDispatch } from "react-redux";
import { updateLessonWithinTopic } from "../../services/courses/lessonOnTopic/updateLessonWithinTopic";
import { selectedResource } from "../../store/slices/ResourceSlice";
import { deleteLessonWithinTopic } from "../../services/courses/lessonOnTopic/deleteLessonWithinTopic";
import DeleteIcon from "../atoms/icons/deleteIcon/DeleteIcon";
import { showNotification } from "../../store/slices/notificationSlice ";

const EdtLessonWithinATopic = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const resourseData = useAppSelector(
    (state) => state.resourceEditAdmin.resourceEditAdmin
  );
  const courseId = useAppSelector((state) => state.courses.selectedCourse?._id);
  const topicId = useAppSelector((state) => state.topics.selectedTopic?._id);
  const [selectedResourceData, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [resources, setResources] = useState<Resource[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("tipo de recurso");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSelectedResource(resourseData);
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
  }, [session?.user.uid, resourseData]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsModalOpen(false);
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

  const handleEditClick = () => {
    if (selectedResourceData) {
      router.push(
        `/dashboard/adminPanel/resources/editResource/${selectedResourceData._id}`
      );
      dispatch(resourceEditAdmin(selectedResourceData));
    } else {
      Swal.fire({
        title: "Seleccionar recurso para poder editar",
        text: "No hay ningun recurso seleccionado",
        icon: "warning",
        confirmButtonText: "Seleccionar",
        confirmButtonColor: "var(--turquoise)",
      });
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const userId = session?.user.uid;
    const currentResourceId = resourseData?._id;
    const newResourceId = selectedResourceData?._id || "";
    Swal.fire({
      title: "¿Estás seguro de actualizar el recurso de este tema?",
      text: "Se actualizara el recurso de este tema",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--turquoise)",
      cancelButtonColor: "var(--red)",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const data = await updateLessonWithinTopic(
            userId || "",
            courseId || "",
            topicId || "",
            currentResourceId || "",
            newResourceId
          );

          if (data.status === 200) {
            dispatch(selectedResource(data.data));
            dispatch(showNotification("Lección editada"));
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

  const deleteResourceWithinCourse = async () => {
    const userId = session?.user.uid;
    const idCourse = courseId;
    const resourceId = resourseData?._id;

    Swal.fire({
      title: "¿Estás seguro de eliminar el recurso de este tema?",
      text: "Se eliminara el recurso de este tema",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--turquoise)",
      cancelButtonColor: "var(--red)",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const data = await deleteLessonWithinTopic(
            userId || "",
            idCourse || "",
            topicId || "",
            resourceId || ""
          );

          if (data.status === 200) {
            dispatch(selectedResource(data.data));
            Swal.fire({
              icon: "success",
              title: "Lección fue eliminada",
              text: "La lección se ha eliminado correctamente.",
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
            "Hubo un problema al eliminar el recurso correctamente.",
            "error"
          );
        }
      }
    });
  };
  return (
    <main className={styles["createCourse"]}>
      <h2 className={styles["createCourse__title"]}>Editar lección</h2>
      <form className={styles["createCourse__form"]} onSubmit={onSubmit}>
        <div className={styles["container__input"]}>
          <h3 className={styles["subtitle__input"]}>
            Filtrar por tipo de recurso
          </h3>
          <select
            className={styles.inputOptions}
            name="typeOfRoute"
            defaultValue={resourseData?.typeResource || "tipo de recurso"}
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
          <Button
            type="submit"
            className={styles["button__submit"]}
            disabled={
              !selectedResourceData ||
              selectedResourceData._id === resourseData?._id
            }
          >
            Guardar
            <AddCircleIcon className={styles["editCourse__addIcon"]} />
          </Button>
        </div>
        <hr className={styles["button__split"]} />
        <div className={styles["button__content-delete-course"]}>
          <Button
            className={styles["button__delete-resource"]}
            onClick={deleteResourceWithinCourse}
          >
            Eliminar recurso{" "}
            <DeleteIcon className={styles["icon__delete-course"]} />
          </Button>
          <Button
            className={styles["button_edit-resource"]}
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

export default EdtLessonWithinATopic;
