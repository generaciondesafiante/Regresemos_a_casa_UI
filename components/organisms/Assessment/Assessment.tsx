"use client";
import styles from "./Assessment.module.css";

const questions = [
    {
        title: "¿ Cuál es el primogenito de abraham ?",
        options: [
            { textAnswer: "Jose", isCorrect: false },
            { textAnswer: "Ismael", isCorrect: false },
            { textAnswer: "Isaac", isCorrect: true },
            { textAnswer: "Jacob", isCorrect: false },
        ],
    },
    {
        title: "¿ Cuál es el primogenito de abraham 2?",
        options: [
            { textAnswer: "Jose2", isCorrect: false },
            { textAnswer: "Ismael2", isCorrect: false },
            { textAnswer: "Isaac2", isCorrect: true },
            { textAnswer: "Jacob2", isCorrect: false },
        ],
    },
    {
        title: "¿ Abraham significa... Padre ?",
        options: [
            { textAnswer: "Falso", isCorrect: true },
            { textAnswer: "Verdadero", isCorrect: false },
        ],
    },
    {
        title: "¿ Cuáles fueron las promesas que le dio Dios ?",
        options: [
            { textAnswer: "Descendencia como las estrellas de la arena", isCorrect:true },
            { textAnswer: "Benditas en ti todas las familias de la tierra", isCorrect: true },
            { textAnswer: "Un territorio que fluye leche y miel", isCorrect: true },
            { textAnswer: "Que tendria varias esposas", isCorrect: false },
        ],
    },
]

export const Assessment = () => {
    let imageStudents = "https://i.imgur.com/bBY0Bs9.png";
    return (
        <div className={styles["assessment__container"]}>
            <section className={styles["assessment__content--topic"]}>
                <h1 className={styles["assessment__topic"]}>Tema #1</h1>
                <p className={styles["assessment__topic--description"]}>El nombre es el propósito/ Hasta jacob.</p>
            </section>
            <section className={styles["assessment__content--image"]}>
                <img src={imageStudents} alt="students" className={styles["assessment__image"]} /> 
            </section>
            <section className={styles["assessment__content--questions"]}>
                <p className={styles["assessment__questions"]}>Son 10 preguntas de esta seccion</p>
            </section>
            <section className={styles["assessment__content--buttomStart"]}>
                <button className={styles["assessment__buttomStart"]}>EMPEZAR</button>
            </section>
        </div>
    )
}
