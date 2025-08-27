import { useCallback } from "react";
import { toast } from "react-toastify";

import { allCoursesTableService } from "@/shared/services/admin/courses/allCourses";
import { Course } from "@/types/admin/courses/allCourses-type";

interface UseUpdateCourseStatusParams {
  refetch: (params?: { search?: string; page?: number }) => Promise<void>;
  search?: string;
  currentPage?: number;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useUpdateCourseStatus = ({
  refetch,
  search = "",
  currentPage = 1,
  onSuccess,
  onError,
}: UseUpdateCourseStatusParams) => {
  const updateStatus = useCallback(
    async (course: Course) => {
      if (!course?._id) {
        toast.error(" Curso inválido");
        return;
      }

      try {
        toast.info(
          course.isActive ? "Desactivando curso..." : "Activando curso...",
          { autoClose: 1500 }
        );

        const updatedCourse = await allCoursesTableService.updateCourse(
          course._id,
          { isActive: !course.isActive }
        );

        if (!updatedCourse) {
          throw new Error("No se recibió respuesta del servidor");
        }

        await refetch({ search, page: currentPage });

        toast.success(
          updatedCourse.isActive
            ? "Curso activado exitosamente"
            : "Curso desactivado exitosamente"
        );

        onSuccess?.();
      } catch (error) {
        console.error("Error al actualizar el estado del curso:", error);
        toast.error("No se pudo actualizar el estado del curso");
        onError?.(error);
      }
    },
    [refetch, search, currentPage, onSuccess, onError]
  );

  return { updateStatus };
};
