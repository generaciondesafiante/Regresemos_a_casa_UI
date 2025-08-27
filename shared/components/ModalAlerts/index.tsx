"use client";
import React from "react";

import Text from "../Text";
import Button from "../Button/Button";
import Icon from "../Icons";

import styles from "./styles.module.css";

export type AlertType = "success" | "error" | "warning";

interface AlertProps {
  type: AlertType;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  primaryButton?: {
    text: string;
    onClick: () => void;
  };
  isOpen: boolean;
  onClose: () => void;
}

const getDefaultIcon = (type: AlertProps["type"]) => {
  switch (type) {
    case "success":
      return (
        <>
          <Icon
            name="LuCircleCheckBig"
            size={60}
            color="var(--greenDesafiante)"
          />
        </>
      );
    case "error":
      return (
        <>
          <Icon name="LuX" size={60} color="var(--red)" />
        </>
      );
    case "warning":
      return (
        <>
          <Icon name="CiWarning" size={60} color="var(--yellow)" />
        </>
      );
    default:
      return (
        <>
          <Icon
            name="LuCircleCheckBig"
            size={60}
            color="var(--greenDesafiante)"
          />
        </>
      );
  }
};

export const AlertModal: React.FC<AlertProps> = ({
  type,
  title,
  subtitle,
  icon,
  primaryButton,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  const handleClose = () => {
    console.log("Modal cerrado");
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={`${styles.alert} ${styles[type]}`}>
            <div className={styles.icon}>{icon || getDefaultIcon(type)}</div>
            <div className={styles.content}>
              <Text variant="h3" color="darkBlue" bold>
                {title}
              </Text>
              <Text variant="body" color="darkBlue">
                {subtitle}
              </Text>
              <div className={styles.actions}>
                <Button
                  className={styles.secondary}
                  variant="danger"
                  onClick={handleClose}
                  width="auto"
                >
                  {"Cancelar"}
                </Button>
                {primaryButton && (
                  <Button
                    className={styles.primary}
                    onClick={primaryButton.onClick}
                    width="auto"
                  >
                    {primaryButton.text}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
