"use client";
import { FC } from "react";
import styles from "./AssessmentFinished.module.css";
import { AssessmentFinishedProps } from "../../../../types/types/assessment.type";
import { Button } from "../../../atoms";

export const AssessmentFinished: FC<AssessmentFinishedProps> = ({ score, questions, onRestartAssessment }) => {
    let imageFinished = "https://i.imgur.com/V8pdd6P.png";
    return (
        <div className={styles["assessment-finished_container"]}>
            <div className={styles["assessment-imageContainer"]}>
                <img src={imageFinished} alt="students" className={styles["assessment-image"]} />
            </div>
            <p className={styles["assessment-result"]}>{`Son ${score} de ${questions?.length} preguntas correctas`}</p>
            <section className={styles["assessment-buttonContainer"]}>
                <Button
                    className={styles["assessment-button"]}
                    onClick={onRestartAssessment}
                >
                    Intentar de nuevo
                </Button>
                <Button className={styles["assessment-button"]}>Repasar la lección</Button>
                <Button className={styles["assessment-button"]}>Continuar</Button>
            </section>
        </div>
    )
}