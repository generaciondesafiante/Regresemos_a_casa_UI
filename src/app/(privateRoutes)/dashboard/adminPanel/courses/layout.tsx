import React from "react";
import styles from "./course.module.css";
import ToastNotification from "../../../../../../components/organisms/NotifyToast/NotifyToast";

const ResourceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={styles["container__resource"]}>
      <section className={styles["content__resource"]}>
        {children}
        <ToastNotification />
      </section>
    </main>
  );
};

export default ResourceLayout;
