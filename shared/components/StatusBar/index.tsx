import React from "react";
import styles from "./styles.module.css";

interface StatusBarProps {
  isActive: boolean;
  labelActive?: string;
  labelInactive?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  isActive,
  labelActive = "Activo",
  labelInactive = "Inactivo",
}) => {
  return (
    <span
      className={
        isActive ? styles["status--active"] : styles["status--inactive"]
      }
    >
      {isActive ? labelActive : labelInactive}
    </span>
  );
};
