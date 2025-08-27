import { useState, useCallback } from "react";

import { allCoursesTableService } from "@/shared/services/admin/courses/allCourses";
import { Course } from "@/types/admin/courses/allCourses-type";
import { resoucesToTopic, Topic, TopicInitialState } from "@/types/admin/Topics/allTopics-type";
import { allTopicsCourseTableService } from "@/shared/services/admin/courses/topic";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface FetchParams {
  search?: string;
  page?: number;
}

export interface ResourceToTopicResponse {
  topic: Topic[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

interface UseFetchCoursesReturn {
  topics: Topic[];
  loading: boolean;
  resources: resoucesToTopic[];
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

export const useFetchResourcesToTopic = (): UseFetchCoursesReturn => {
  const { idTopic } = useParams();
  const { data: session } = useSession();
  const userId = session?.user.uid as string;
  const [topics, setTopics] = useState<TopicInitialState[]>([]);
  const [resources, setResources] = useState<resoucesToTopic[]>([]);
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
        const data = await allTopicsCourseTableService.resourseToTopic(
          userId,
          idTopic as string,
          {
            limit: 10,
            search: searchQuery,
            page,
          }
        );
        console.log(data);
        setTopics(Array.isArray(data?.topic) ? data.topic : [data.topic]);
        setResources(data.topic.resources ?? []);
        setPagination({
          totalItems: data.pagination.totalCount,
          totalPages: data.pagination.totalPages,
          currentPage: data.pagination.currentPage,
          hasPreviousPage: data.pagination.hasPreviousPage,
          hasNextPage: data.pagination.hasNextPage,
        });
      } catch (error) {
        console.error("Error al cargar cursos:", error);
        setTopics([]);
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
    topics: topics,
    resources : resources,
    loading,
    pagination,
    search,
    refetch,
    setSearch: setSearch,
    setCurrentPage: (page: number) =>
      setPagination((prev) => ({ ...prev, currentPage: page })),
  };
};
