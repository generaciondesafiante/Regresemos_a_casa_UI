"use client";
import styles from "./AssessmentTitleSubtitleBackground.module.css";

export const AssessmentTitleSubtitleBackground = () => {
  return (
    <div className={styles["assessment-container"]}>
      <section className={styles["assessment-topic_container"]}>
        <h1 className={styles["assessment-topic"]}>Tema #1</h1>
        <p className={styles["assessment-topic_description"]}>
          El nombre es el propósito/ Hasta Jacob.
        </p>
      </section>
    </div>
  );
};
