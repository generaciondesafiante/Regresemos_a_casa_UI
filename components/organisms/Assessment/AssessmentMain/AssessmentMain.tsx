"use client";
import { FC } from "react";
import styles from "./AssessmentMain.module.css";
import { AssessmentMainProps } from "../../../../types/types/assessment.type";
import { questionsData } from "../AssessmentQuestionsData";
import { Button } from "../../../atoms";
import { useAppSelector } from "../../../../store/store";

export const AssessmentMain: FC<AssessmentMainProps> = ({
  onStartAssessment,
}) => {
  let imageStudents = "https://i.imgur.com/bBY0Bs9.png";
  const selectedLesson = useAppSelector(
    (state) => state.lessons.selectedLesson
  );
 

  return (
    <div className={styles["assessment-questions_container"]}>
      <img
        src={imageStudents}
        alt="students"
        className={styles["assessment-image"]}
      />
      <div className={styles["assessment-questions_content"]}>
        <p className={styles["assessment-questions"]}>
          {`Son ${selectedLesson?.questions.length} preguntas de esta sección`}
        </p>
      </div>
      <div className={styles["assessment-startButton_container"]}>
        <Button
          className={styles["assessment-startButton"]}
          onClick={onStartAssessment}
        >
          EMPEZAR
        </Button>
      </div>
    </div>
  );
};
