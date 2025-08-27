"use client";
import { useEffect, useState } from "react";

import Table from "@/shared/components/Table";

import { Course } from "@/types/admin/courses/allCourses-type";
import { courseColumns } from "./columsTableCourse";
import styles from "./styles.module.css";
import { AlertModal, AlertType } from "@/shared/components/ModalAlerts";
import { useFetchCourses } from "./hooks/useFetchCourses";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useUpdateCourseStatus } from "./hooks/useUpdateStatusCourse";

export const CourseTableAdmin = () => {
  const {
    refetch,
    courses,
    loading,
    pagination,
    setCurrentPage,
    search,
    setSearch,
  } = useFetchCourses();

  const { updateStatus } = useUpdateCourseStatus({
    refetch,
    search,
    currentPage: pagination.currentPage,
    onSuccess: () => {
      setModalOpen(false);
      setSelectedCourse(null);
    },
    onError: (error) => {
      console.error("Error en updateStatus:", error);
    },
  });

  const [alert, setAlert] = useState({
    type: "" as AlertType,
    title: "",
    subtitle: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    refetch({ search, page: pagination.currentPage });
  }, [search, pagination.currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (course: Course) => {
    setSelectedCourse(course);
    setModalOpen(true);
    setAlert({
      type: "warning",
      title: course.isActive ? "Desactivar" : "Activar",
      subtitle: `¿Estás seguro de que deseas ${
        course.isActive ? "desactivar" : "activar"
      } el curso "${course.nameCourse}"?`,
    });
  };

  const columns = courseColumns({ onReloadClick: handleOpenModal });

  const handleUpdateStatusCourse = () => {
    if (selectedCourse) {
      updateStatus(selectedCourse);
    }
  };

  return (
    <main className={styles["container--table"]}>
      <Table
        labelButton="Agregar curso"
        title="Cursos"
        data={courses ?? []}
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
        onSearchChange={setSearch}
        placeHolderSearch="Buscar por nombre del curso o id del curso"
      />
      <AlertModal
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
