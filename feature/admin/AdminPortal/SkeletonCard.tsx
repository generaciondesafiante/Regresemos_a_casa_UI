import React from "react";
import styles from "./AdminPanel.module.css";

interface SkeletonCardProps {
  backgroundColor: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  backgroundColor,
}) => {
  return (
    <section
      className={styles["adminPanel__content--cards"]}
      style={{ backgroundColor }}
    >
      <div
        className={styles["skeleton__shimmer"]}
        style={{ width: "60%", height: "24px", marginBottom: "1rem" }}
      ></div>
      <div
        className={styles["skeleton__shimmer"]}
        style={{ width: "100%", height: "16px", marginBottom: "0.5rem" }}
      ></div>
      <div
        className={styles["skeleton__shimmer"]}
        style={{ width: "100%", height: "16px", marginBottom: "0.5rem" }}
      ></div>
      <div
        className={styles["skeleton__shimmer"]}
        style={{ width: "80%", height: "16px", marginBottom: "1rem" }}
      ></div>
      <div
        className={styles["skeleton__shimmer"]}
        style={{ width: "30%", height: "32px", alignSelf: "flex-end" }}
      ></div>
    </section>
  );
};
