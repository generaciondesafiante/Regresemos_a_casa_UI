"use client";
import React from "react";

import Text from "../Text";
import Button from "../Button/Button";
import Icon from "../Icons";

import styles from "./styles.module.css";

interface AlertProps {
  type: "success" | "error" | "warning";
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  primaryButton?: {
    text: string;
    onClick: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
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

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  subtitle,
  icon,
  primaryButton,
  secondaryButton,
}) => {
  return (
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
            {secondaryButton && (
              <Button
                className={styles.secondary}
                onClick={secondaryButton.onClick}
              >
                {secondaryButton.text}
              </Button>
            )}
            {primaryButton && (
              <Button
                className={styles.primary}
                onClick={primaryButton.onClick}
              >
                {primaryButton.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
