"use client";
import { FC } from "react";
import styles from "./AssessmentMain.module.css";
import { AssessmentMainProps } from "../../../../types/types/assessment.type";
import { questions } from "../../Assessment/AssessmentQuestions/AssessmentQuestions";
import { Button } from "../../../atoms";

export const AssessmentMain: FC<AssessmentMainProps> = ({
  onStartAssessment,
}) => {
  let imageStudents = "https://i.imgur.com/bBY0Bs9.png";

  return (
    <section className={styles["assessment-questions_container"]}>
      <div className={styles["assessment-image_container"]}>
        <img
          src={imageStudents}
          alt="students"
          className={styles["assessment-image"]}
        />
      </div>
      <div className={styles["assessment-questions_content"]}>
        <p
          className={styles["assessment-questions"]}
        >{`Son ${questions.length} preguntas de esta sección`}</p>
      </div>
      <div className={styles["assessment-startButton_container"]}>
        <Button
          className={styles["assessment-startButton"]}
          onClick={onStartAssessment}
        >
          EMPEZAR
        </Button>
      </div>
    </section>
  );
};
