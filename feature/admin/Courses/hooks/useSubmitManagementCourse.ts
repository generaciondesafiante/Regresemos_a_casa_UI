import { useCallback, useState } from "react";

import { allCoursesTableService } from "@/shared/services/admin/courses/allCourses";
import { TypeOfRouteCourse } from "@/types/admin/courses/createCourse-type";
import { useSession } from "next-auth/react";

import { useAlertWithRedirect } from "@/shared/hooks/useAlertWithRedirect/useAlertWithRedirect";
import { AlertState } from "@/types/AlertModal/type";

export type FormData = {
  nameCourse: string;
  titleCourse: string;
  typeOfRoute: string;
};

interface UseSubmitCourseParams {
  idCourse?: string;
  onSuccess?: () => void;
}


export const useSubmitCourse = ({
  idCourse,
}: UseSubmitCourseParams) => {
  const { data: session } = useSession();
  const idUser = session?.user?.uid || null;

  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    type: "success",
    title: "",
    subtitle: "",
    primaryButton: undefined,
  });

  const { handleShowAlert } = useAlertWithRedirect({ setAlert, setShowAlert });

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        const payload = {
          ...data,
          typeOfRoute: data.typeOfRoute as TypeOfRouteCourse,
        };

        const isUpdating = !!idCourse;

        const response = isUpdating
          ? await allCoursesTableService.updateCourse(idCourse, payload)
          : await allCoursesTableService.createCourse(payload, idUser);

        if (response) {
          const successTitle = isUpdating
            ? "Curso actualizado exitosamente"
            : "Curso creado exitosamente";
          const successSubtitle =
            "Este curso se verá reflejado en la plataforma automáticamente.";
          handleShowAlert(
            "success",
            successTitle,
            successSubtitle,
            isUpdating
              ? `/dashboard/adminPanel/courses/topic/${idCourse}`
              : "/dashboard/adminPanel/courses"
          );
        }
      } catch (idCourseidCourseerror) {
        const isUpdating = !!idCourse;
        const errorTitle = isUpdating
          ? "Error al actualizar el curso"
          : "Error al crear el curso";
        const errorSubtitle = "Por favor, inténtalo de nuevo más tarde.";
        handleShowAlert("error", errorTitle, errorSubtitle);
      }
    },
    [idCourse, idUser, handleShowAlert]
  );

  const deleteCourse = useCallback(() => {
    setAlert({
      type: "warning",
      title: "Eliminar curso",
      subtitle:
        "¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.",
      primaryButton: {
        text: "Eliminar",
        onClick: async () => {
          try {
            if (!idCourse) return;
            const response = await allCoursesTableService.deleteCourse(
              idCourse
            );
            console.log(response);
            handleShowAlert(
              "success",
              "Curso eliminado",
              "El curso ha sido eliminado correctamente."
            );
          } catch (error) {
            handleShowAlert(
              "error",
              "Error al eliminar",
              "No se pudo eliminar el curso. Inténtalo más tarde.",
              `/dashboard/adminPanel/courses/topic/${idCourse}`
            );
          }
        },
      },
    });
    setShowAlert(true);
  }, [idCourse, handleShowAlert]);

  return {
    onSubmit,
    deleteCourse,
    showAlert,
    alert,
    closeAlert: () => setShowAlert(false),
  };
};
