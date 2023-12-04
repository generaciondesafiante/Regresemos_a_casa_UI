"use client";
import styles from "./AssessmentQuestions.module.css";

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
            { textAnswer: "Descendencia como las estrellas de la arena", isCorrect: true },
            { textAnswer: "Benditas en ti todas las familias de la tierra", isCorrect: true },
            { textAnswer: "Un territorio que fluye leche y miel", isCorrect: true },
            { textAnswer: "Que tendria varias esposas", isCorrect: false },
        ],
    },
]

export const AssessmentQuestions = () => {
    return (
        <div className={styles["assessmentQuestions__container--questions"]}>
            <section>
                <div className={styles["assessmentQuestions__img"]}></div>
            </section>
            <section>
                <p className={styles["assessmentQuestions__numberQuestion"]}>1 de 10</p>
            </section>
            <div className={styles["assessmentQuestions__container--buttons"]}>
                    <section className={styles["assessmentQuestions__content--titleQuestion"]}>
                        <span className={styles["assessmentQuestions__titleQuestion"]}>¿ Cuál es el primogénito de Abraham ?</span>
                    </section>
                    <section className={styles["assessmentQuestions__content--buttons"]}>
                        <div className={styles["assessmentQuestions__row"]}>
                            <button className={`${styles["assessmentQuestions__button"]} ${styles["button1"]}`}>Opcion 1</button>
                            <button className={`${styles["assessmentQuestions__button"]} ${styles["button2"]}`}>Opcion 2</button>
                        </div>
                        <div className={styles["assessmentQuestions__row"]}>
                            <button className={`${styles["assessmentQuestions__button"]} ${styles["button3"]}`}>Opcion 3</button>
                            <button className={`${styles["assessmentQuestions__button"]} ${styles["button4"]}`}>Opcion 4</button>
                        </div>
                    </section>
            </div>
        </div>
    )
}
