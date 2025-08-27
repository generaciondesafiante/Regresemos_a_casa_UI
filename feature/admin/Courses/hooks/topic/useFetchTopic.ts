import { useState, useCallback } from "react";

import { TopicTableResponse } from "@/types/admin/Topics/allTopics-type";
import { allTopicsCourseTableService } from "@/shared/services/admin/courses/topic";
import { useParams } from "next/navigation";

interface FetchParams {
  search?: string;
  page?: number;
}

interface UseFetchTopicReturn {
  topics: TopicTableResponse | undefined;
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

export const useFetchTopics = (): UseFetchTopicReturn => {
  const [topics, setTopics] = useState<TopicTableResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const { idCourse } = useParams();

  const refetch = useCallback(
    async (params?: FetchParams) => {
      const page = params?.page ?? pagination.currentPage;
      const searchQuery = params?.search ?? search;

      setLoading(true);
      try {
        const data = await allTopicsCourseTableService.getAllTopicsTable(
          idCourse as string,
          {
            limit: 10,
            search: searchQuery,
            page: pagination.currentPage,
          }
        );
        console.log(data);
        setTopics(data);
        setPagination({
          totalItems: data.pagination.totalCount,
          totalPages: data.pagination.totalPages,
          currentPage: data.pagination.currentPage,
          hasPreviousPage: data.pagination.hasPreviousPage,
          hasNextPage: data.pagination.hasNextPage,
        });
      } catch (error) {
        console.error("Error al cargar cursos:", error);
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
    topics,
    loading,
    pagination,
    search,
    refetch,
    setSearch: setSearch,
    setCurrentPage: (page: number) =>
      setPagination((prev) => ({ ...prev, currentPage: page })),
  };
};
