import { AlertType } from "@/shared/components/ModalAlerts";

export interface AlertState {
  type: AlertType;
  title: string;
  subtitle: string;
  primaryButton?: {
    text: string;
    onClick: () => void;
  };
}
