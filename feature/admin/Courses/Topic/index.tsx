"use client";
import { useEffect, useState } from "react";
import Table from "@/shared/components/Table";
import styles from "../styles.module.css";
import { useParams } from "next/navigation";
import { Topic } from "@/types/admin/Topics/allTopics-type";
import { topicsColumns } from "./columsTableTopic";
import { AlertModal, AlertType } from "@/shared/components/ModalAlerts";
import { useUpdateTopicStatus } from "../hooks/topic/useUpdateTopic";
import { useFetchTopics } from "../hooks/topic/useFetchTopic";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const TopicsCourseTableAdmin = () => {
  const { idCourse } = useParams();
  const [alert, setAlert] = useState({
    type: "" as AlertType,
    title: "",
    subtitle: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectecTopic, setselectecTopic] = useState<Topic | null>(null);

  const {
    refetch,
    topics,
    pagination,
    setCurrentPage,
    search,
    loading,
    setSearch,
  } = useFetchTopics();

  const { updateStatus } = useUpdateTopicStatus({
    refetch,
    search,

    currentPage: pagination.currentPage,
    onSuccess: () => {
      setModalOpen(false);
      setselectecTopic(null);
    },
    onError: (error) => {
      console.error("Error en updateStatus:", error);
    },
  });

  useEffect(() => {
    refetch({ search, page: pagination.currentPage });
  }, [search, pagination.currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (topic: Topic) => {
    setselectecTopic(topic);
    setModalOpen(true);
    setAlert({
      type: "warning",
      title: topic.isActive ? "Desactivar" : "Activar",
      subtitle: `¿Estás seguro de que deseas ${
        topic.isActive ? "desactivar" : "activar"
      } el tema "${topic.nameTopic}"?`,
    });
  };

  const columns = topicsColumns({ onReloadClick: handleOpenModal });

  const handleUpdateStatusCourse = () => {
    if (selectecTopic) {
      updateStatus(selectecTopic);
    }
  };

  return (
    <main className={styles["container--table"]}>
      <Table<Topic>
        data={topics?.topics ?? []}
        columns={columns}
        labelButton="Agregar tema"
        title={topics?.course.nameCourse ?? ""}
        subTitle={topics?.course.titleCourse}
        searchable
        filterable
        paginated
        loading={loading}
        totalItems={pagination.totalItems}
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
        onPageChange={handlePageChange}
        navigateRouteButton={`/dashboard/adminPanel/courses/topic/${idCourse}/createTopic`}
        navigateRouteHeader={`/dashboard/adminPanel/courses/updateCourse/${idCourse}`}
        onSearchChange={setSearch}
        placeHolderSearch="Buscar por nombre del curso o id del curso"
      />

      <AlertModal
        isOpen={modalOpen}
        type="warning"
        title={alert.title}
        subtitle={alert.subtitle}
        primaryButton={{
          text: selectecTopic?.isActive ? "Desactivar curso" : "Activar curso",
          onClick: () => {
            handleUpdateStatusCourse();
          },
        }}
        onClose={() => setModalOpen(false)}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </main>
  );
};
