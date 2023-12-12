"use client";
import styles from "./AssessmentFinished.module.css";

export const AssessmentFinished = () => {
    let imageFinished = "https://i.imgur.com/V8pdd6P.png";
    return (
        <div className={styles["assessment__container--finished"]}>
            <section className={styles["assessment__content--image"]}>
                <img src={imageFinished} alt="students" className={styles["assessment__image"]} /> 
            </section>
            <section className={styles["assessment__content--result"]}>
                <p className={styles["assessment__result"]}>Son 8 de 10 preguntas correctas</p>
            </section>
            <section className={styles["assessment__content--button"]}>
                <button className={styles["assessment__button"]}>Volver a presentar</button>
                <button className={styles["assessment__button"]}>Repasar el video</button>
                <button className={styles["assessment__button"]}>Continuar</button>
            </section>
        </div>
    )
}