import { useCallback, useState } from "react";
import { allTopicsCourseTableService } from "@/shared/services/admin/courses/topic";
import { useAlertWithRedirect } from "@/shared/hooks/useAlertWithRedirect/useAlertWithRedirect";
import { AlertState } from "@/types/AlertModal/type";

interface TopicFormData {
  nameTopic: string;
}

interface UseManagementTopicProps {
  idTopic?: string;
  courseId?: string;
  idUser: string | null;
}

export const useManagementTopic = ({
  idTopic,
  courseId,
  idUser,
}: UseManagementTopicProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    type: "success",
    title: "",
    subtitle: "",
    primaryButton: undefined,
  });

  const redirectTo = `/dashboard/adminPanel/courses/topic/${courseId}`;
  const fallbackPath = `${redirectTo}/createTopic`;

  const { handleShowAlert } = useAlertWithRedirect({ setAlert, setShowAlert });

  const onSubmit = async ({ nameTopic }: TopicFormData) => {
    if (!idUser) return;

    try {
      if (idTopic) {
        // Actualizar tema existente
        const updated = await allTopicsCourseTableService.updateTopic(idTopic, {
          nameTopic,
        });

        if (updated) {
          handleShowAlert(
            "success",
            "Tema actualizado",
            "El tema ha sido actualizado exitosamente y será visible en el curso.",
            redirectTo
          );
        }
      } else {
        // Crear nuevo tema
        const created = await allTopicsCourseTableService.createTopic(idUser, {
          nameTopic,
          courseId: courseId || "",
        });

        if (created?.ok) {
          handleShowAlert(
            "success",
            "Tema creado",
            "El tema ha sido creado exitosamente y será visible en el curso.",
            redirectTo
          );
        }
      }
    } catch {
      handleShowAlert(
        "error",
        "Error",
        "Ha ocurrido un error. Por favor, intenta nuevamente.",
        fallbackPath
      );
    }
  };

  const onDeleteTopic = useCallback(() => {
    setAlert({
      type: "warning",
      title: "Eliminar tema",
      subtitle:
        "¿Estás seguro de que deseas eliminar este tema? Esta acción no se puede deshacer.",
      primaryButton: {
        text: "Eliminar",
        onClick: async () => {
          try {
            if (!idTopic && !idUser) return;
            const response = await allTopicsCourseTableService.deleteTopic(
              idTopic as string,
              idUser as string
            );
            console.log(response);
            handleShowAlert(
              "success",
              "Tema eliminado",
              "El tema ha sido eliminado correctamente.",
              redirectTo
            );
          } catch (error) {
            handleShowAlert(
              "error",
              "Error al eliminar",
              "No se pudo eliminar el tema. Inténtalo más tarde.",
              `/dashboard/adminPanel/courses/resourcesToTopic/${courseId}/${idTopic}`
            );
          }
        },
      },
    });
    setShowAlert(true);
  }, [idTopic, handleShowAlert]);

  return {
    onSubmit,
    onDeleteTopic,
    showAlert,
    alert,
    closeAlert: () => setShowAlert(false),
  };
};
