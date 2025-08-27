"use client";
import { useEffect, useState } from "react";

import Table from "@/shared/components/Table";

import { Course } from "@/types/admin/courses/allCourses-type";
import styles from "./styles.module.css";
import { AlertModal, AlertType } from "@/shared/components/ModalAlerts";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useParams } from "next/navigation";
import { allTopicsCourseTableService } from "@/shared/services/admin/courses/topic";
import { useSession } from "next-auth/react";
import { Topic } from "@/types/admin/Topics/allTopics-type";
import { Resource } from "@/types/types/Resources";
import { columns } from "./columnTableResourcesToTopic";
import { useFetchResourcesToTopic } from "../hooks/topic/useManagementResourcesToTopic";

export const ResourcesTopic = () => {
  const { idTopic, idCourse } = useParams();
  const [alert, setAlert] = useState({
    type: "" as AlertType,
    title: "",
    subtitle: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResourcesToTopic, setSelectedResourceToTopic] =
    useState<Topic | null>(null);

  const {
    refetch,
    topics,
    resources,
    loading,
    pagination,
    setCurrentPage,
    search,
    setSearch,
  } = useFetchResourcesToTopic();

  // console.log("Temas en la tabla", topics[0]._id);

  useEffect(() => {
    refetch({ search, page: pagination.currentPage });
  }, [search, pagination.currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (resourceToTopic: Topic) => {
    setSelectedResourceToTopic(resourceToTopic);
    setModalOpen(true);
    setAlert({
      type: "warning",
      title: resourceToTopic.isActive ? "Desactivar" : "Activar",
      subtitle: `¿Estás seguro de que deseas ${
        resourceToTopic.isActive ? "desactivar" : "activar"
      } el recurso "${resourceToTopic.nameTopic}"?`,
    });
  };

  return (
    <main className={styles["container--table"]}>
      <Table
        labelButton="Agregar leccion"
        title={
          topics.length > 0 ? ` ${topics[0].nameTopic}` : "Recursos del tema"
        }
        data={resources ?? []}
        columns={columns}
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
        navigateRouteButton={"/dashboard/adminPanel/courses/createCourse"}
        navigateRouteHeader={`/dashboard/adminPanel/courses/topic/${idCourse}/${idTopic}`}
        onSearchChange={setSearch}
        placeHolderSearch="Buscar por nombre del curso o id del curso"
      />
      {/* <AlertModal
        isOpen={modalOpen}
        type="warning"
        title={alert.title}
        subtitle={alert.subtitle}
        primaryButton={{
          text: selectedCourse?.isActive ? "Desactivar curso" : "Activar curso",
          onClick: () => {
            handleUpdateStatusCourse();
          },
        }}
        onClose={() => setModalOpen(false)}
      /> */}

      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      /> */}
    </main>
  );
};
