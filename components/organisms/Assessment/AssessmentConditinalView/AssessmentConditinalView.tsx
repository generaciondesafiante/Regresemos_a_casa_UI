"use client";
import { FC, useState } from "react";
import { AssestmentConditionalView } from "../../../../types/types/assessment.type";
import styles from "./AssestmentConditionalView.module.css";
import { AssessmentFinished, AssessmentMain, AssessmentQuestions } from "../..";

export const AssessmentConditinalView: FC<AssestmentConditionalView> = () => {
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);

  const handleStartAssessment = () => {
    setAssessmentStarted(true);
  };

  return (
    <section className={styles["assessment-container"]}>
      <h3 className={styles["assessment-topicTitle"]}>Tema #1</h3>
      <p className={styles["assessment-topicDescription"]}>
        El nombre es el propósito/ Hasta Jacob.
      </p>
      {!assessmentCompleted &&
        (!assessmentStarted ? (
          <AssessmentMain onStartAssessment={handleStartAssessment} />
        ) : (
          <AssessmentQuestions />
        ))}
      {assessmentCompleted && <AssessmentFinished />}
    </section>
  );
};
