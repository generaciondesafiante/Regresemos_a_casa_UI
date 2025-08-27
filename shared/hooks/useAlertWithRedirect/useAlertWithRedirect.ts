// shared/hooks/useAlertWithRedirect.ts
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { AlertType } from "@/shared/components/ModalAlerts";

interface UseAlertWithRedirectParams {
  setShowAlert: (value: boolean) => void;
  setAlert: (value: {
    type: AlertType;
    title: string;
    subtitle: string;
    primaryButton: {
      text: string;
      onClick: () => void;
    };
  }) => void;
}

export const useAlertWithRedirect = ({
  setAlert,
  setShowAlert,
}: UseAlertWithRedirectParams) => {
  const router = useRouter();

  const handleShowAlert = useCallback(
    (type: AlertType, title: string, subtitle: string, route?: string) => {
      setAlert({
        type,
        title,
        subtitle,
        primaryButton: {
          text: "Aceptar",
          onClick: () => {
            setShowAlert(false);
            setTimeout(() => {
              router.push(route || "/dashboard/adminPanel/courses");
            }, 300);
          },
        },
      });
      setShowAlert(true);
    },
    [router, setAlert, setShowAlert]
  );

  return { handleShowAlert };
};
