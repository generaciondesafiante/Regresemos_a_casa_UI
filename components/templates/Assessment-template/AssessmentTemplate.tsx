"use client";
import { useState } from "react";
import {
  AssessmentMain,
  AssessmentQuestions,
  AssessmentFinished,
} from "../../organisms";
import { AssessmentTemplateProps } from "../../../types/types/assessment.type";
import styles from "./AssessmentTemplate.module.css";

export const AssessmentTemplate: React.FC<AssessmentTemplateProps> = () => {
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
