import { FC } from "react";
import { ResourcesAndVerses, CourseResources } from "../../organisms";
import styles from "./CourseResources.module.css";

export const CourseResourcesTemplate: FC = () => {
  return (
    <div className={styles["resourcesPage-container"]}>
      <CourseResources />
      <ResourcesAndVerses />
    </div>
  );
};
