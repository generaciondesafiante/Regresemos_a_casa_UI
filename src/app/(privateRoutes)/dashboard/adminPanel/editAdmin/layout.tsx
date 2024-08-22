import React from "react";
import styles from "./layout.module.css";
import { ToastContainer } from "react-toastify";

const Adminlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={styles["editAdmin"]}>
      <section className={styles["content__editAdmin"]}>
        {children}
        <ToastContainer className={styles["toastContainer"]} />
      </section>
    </main>
  );
};

export default Adminlayout;
