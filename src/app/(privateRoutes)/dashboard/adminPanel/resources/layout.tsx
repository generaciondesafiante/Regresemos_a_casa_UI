import React from "react";
import styles from "./resource.module.css";

const ResourceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={styles["container__resource"]}>
      <section className={styles["content__resource"]}>{children}</section>
    </main>
  );
};

export default ResourceLayout;
