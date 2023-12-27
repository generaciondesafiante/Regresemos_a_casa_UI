"use client";
import styles from "./AssessmentTitleSubtitleBackground.module.css";

export const AssessmentTitleSubtitleBackground = () => {
    return (
        <div className={styles["assessment__container"]}>
            <section className={styles["assessment__content--topic"]}>
                <h1 className={styles["assessment__topic"]}>Tema #1</h1>
                <p className={styles["assessment__topic--description"]}>El nombre es el propósito/ Hasta jacob.</p>
            </section>            
        </div>
    )
}
