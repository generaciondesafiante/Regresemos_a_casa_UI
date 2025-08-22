"use client";
import { useEffect, useState } from "react";

import Table from "@/shared/components/Table";
import { allCoursesTableService } from "@/shared/services/admin/courses/allCourses";

import { Course } from "@/types/admin/courses/allCourses-type";
import { columns } from "./columsTableCourse";
import styles from "./styles.module.css";

export const CourseTableAdmin = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const data = await allCoursesTableService.getAllCoursesTable({
        limit: 10,
        search,
        page: pagination.currentPage,
      });

      setCourses(data.courses);
      setPagination({
        totalItems: data.pagination.totalCount,
        totalPages: data.pagination.totalPages,
        currentPage: data.pagination.currentPage,
        hasPreviousPage: data.pagination.hasPreviousPage,
        hasNextPage: data.pagination.hasNextPage,
      });
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [search, pagination.currentPage]);

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
  };

  return (
    <main className={styles["container--table"]}>
      <Table
        labelButton="Agregar curso"
        title="Cursos"
        data={courses}
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
        navigateRoute={"/dashboard/adminPanel/courses/createCourse"}
        onSearchChange={setSearch}
        placeHolderSearch="Buscar por nombre del curso o id del curso"
      />
    </main>
  );
};
