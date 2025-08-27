import { useCallback } from "react";
import { toast } from "react-toastify";

import { allCoursesTableService } from "@/shared/services/admin/courses/allCourses";
import { Topic } from "@/types/admin/Topics/allTopics-type";
import { allTopicsCourseTableService } from "@/shared/services/admin/courses/topic";

interface UseUpdateCourseStatusParams {
  refetch: (params?: { search?: string; page?: number }) => Promise<void>;
  search?: string;
  currentPage?: number;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useUpdateTopicStatus = ({
  refetch,
  search = "",
  currentPage = 1,
  onSuccess,
  onError,
}: UseUpdateCourseStatusParams) => {
  const updateStatus = useCallback(
    async (topic: Topic) => {
      if (!topic?._id) {
        toast.error("Tema inválido");
        return;
      }

      try {
        toast.info(
          topic.isActive ? "Desactivando tema..." : "Activando tema...",
          { autoClose: 1500 }
        );

        const updatedCourse = await allTopicsCourseTableService.updateTopic(
          topic._id,
          { isActive: !topic.isActive }
        );

        if (!updatedCourse) {
          throw new Error("No se recibió respuesta del servidor");
        }

        await refetch({ search, page: currentPage });

        toast.success(
          updatedCourse.isActive
            ? "Tema activado exitosamente"
            : "Tema desactivado exitosamente"
        );

        onSuccess?.();
      } catch (error) {
        console.error("Error al actualizar el estado del tema:", error);
        toast.error("No se pudo actualizar el estado del tema");
        onError?.(error);
      }
    },
    [refetch, search, currentPage, onSuccess, onError]
  );

  return { updateStatus };
};
