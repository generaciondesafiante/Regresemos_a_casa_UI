import { FC } from "react";
import { DashboardUserWelcome, ResourcesAndVerses } from "../../organisms";
import styles from "./DashboardTemplate.module.css";

export const DashboardTemplate: FC = () => {
  return (
    <div className={styles["dashboard-container"]}>
      <DashboardUserWelcome />
      <ResourcesAndVerses />
    </div>
  );
};
