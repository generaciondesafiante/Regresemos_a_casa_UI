import { useState, useCallback } from "react";

import { allCoursesTableService } from "@/shared/services/admin/courses/allCourses";
import { Course } from "@/types/admin/courses/allCourses-type";

interface FetchParams {
  search?: string;
  page?: number;
}

export interface CoursesResponse {
  courses: Course[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

interface UseFetchCoursesReturn {
  courses: Course[];
  loading: boolean;
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  search: string;
  refetch: (params?: FetchParams) => Promise<void>;
  setSearch: (search: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useFetchCourses = (): UseFetchCoursesReturn => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const refetch = useCallback(
    async (params?: FetchParams) => {
      const page = params?.page ?? pagination.currentPage;
      const searchQuery = params?.search ?? search;

      setLoading(true);
      try {
        const data = await allCoursesTableService.getAllCoursesTable({
          limit: 10,
          search: searchQuery,
          page,
        });
        console.log(data);
        setCourses(data.courses);
        setPagination({
          totalItems: data.pagination.totalCount,
          totalPages: data.pagination.totalPages,
          currentPage: data.pagination.currentPage,
          hasPreviousPage: data.pagination.hasPreviousPage,
          hasNextPage: data.pagination.hasNextPage,
        });
      } catch (error) {
        console.error("Error al cargar cursos:", error);
        setCourses([]);
        setPagination({
          totalItems: 0,
          totalPages: 1,
          currentPage: page,
          hasPreviousPage: false,
          hasNextPage: false,
        });
      } finally {
        setLoading(false);
      }
    },
    [search, pagination.currentPage]
  );

  return {
    courses,
    loading,
    pagination,
    search,
    refetch,
    setSearch: setSearch,
    setCurrentPage: (page: number) =>
      setPagination((prev) => ({ ...prev, currentPage: page })),
  };
};
