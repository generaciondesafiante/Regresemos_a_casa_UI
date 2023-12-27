"use client";
import { FC } from "react";
import styles from "./AssessmentMain.module.css";
import { AssessmentMainProps } from "../../../../types/types/assessment.type";

export const AssessmentMain: FC<AssessmentMainProps> = ({ onStartAssessment }) => {
    let imageStudents = "https://i.imgur.com/bBY0Bs9.png";

    return (
        <div className={styles["assessment__container--questions"]}>
            <section className={styles["assessment__content--image"]}>
                <img src={imageStudents} alt="students" className={styles["assessment__image"]} />
            </section>
            <section className={styles["assessment__content--questions"]}>
                <p className={styles["assessment__questions"]}>{`Son (No me da, para revizar) preguntas de esta sección`}</p>
            </section>
            <section className={styles["assessment__content--buttomStart"]}>
                <button className={styles["assessment__buttomStart"]} onClick={onStartAssessment}>EMPEZAR</button>
            </section>
        </div>
    )
}
