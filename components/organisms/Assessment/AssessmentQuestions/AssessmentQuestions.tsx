"use client";
import { useState } from "react";
import { Button } from "../../../atoms";
import { AssessmentFinished } from "../AssessmentFinished/AssessmentFinished";
import { useAppSelector } from "../../../../store/store";
import styles from "./AssessmentQuestions.module.css";

export const AssessmentQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const selectedResource = useAppSelector(
    (state) => state.resource.selectedResource
  );
  let questionsData: any;

  if (selectedResource && "questions" in selectedResource) {
    questionsData = selectedResource.questions;
  } else {
    questionsData = null;
  }

  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [resetAssessment, setResetAssessment] = useState(false);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState<number[]>(
    []
  );
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [selectedIncorrectAnswers, setSelectedIncorrectAnswers] = useState<
    number[]
  >([]);
  const [selectedCorrectAnswers, setSelectedCorrectAnswers] = useState<
    number[]
  >([]);
  const [showCorrectIncorrect, setShowCorrectIncorrect] = useState(false);
  const [answerLocked, setAnswerLocked] = useState(false);

  const renderAnswerOptions = () => {
    if (questionsData && questionsData[currentQuestion]) {
      return questionsData[currentQuestion].options.map(
        (option: any, index: any) => {
          const isSelected = selectedAnswerIndices.includes(index);
          const isCorrect = selectedCorrectAnswers.includes(index);
          const isIncorrect = selectedIncorrectAnswers.includes(index);
          const isRevealed = answerRevealed && isSelected;
          const buttonColorClass = styles[`color${index + 1}`];

          const buttonClass = [
            styles["assessmentQuestions-answerOptions_button"],
            buttonColorClass,
            isSelected ? styles["selected"] : "",
            isCorrect ? styles["correctAnswer"] : "",
            isIncorrect ? styles["incorrect"] : "",
            isRevealed ? "revealed" : "",
          ].join(" ");

          return (
            <Button
              type="button"
              key={index}
              className={buttonClass}
              onClick={() => !answerLocked && handleAnswerClick(index)}
            >
              {option.textAnswer}
            </Button>
          );
        }
      );
    } else {
      return null;
    }
  };

  const handleAnswerClick = (index: number) => {
    const currentQuestionData = questionsData[currentQuestion];

    if (currentQuestionData.questionType === "multiple") {
      const updatedSelectedAnswers = [...selectedAnswerIndices];
      const answerIndex = updatedSelectedAnswers.indexOf(index);

      if (answerIndex !== -1) {
        updatedSelectedAnswers.splice(answerIndex, 1);
      } else {
        updatedSelectedAnswers.push(index);
      }

      setSelectedAnswerIndices(updatedSelectedAnswers);
    } else {
      setSelectedAnswerIndices([index]);
    }
  };

  const handleCheckAnswerClick = () => {
    if (selectedAnswerIndices.length > 0) {
      setShowCorrectIncorrect(true);

      const correctAnswerIndices = questionsData[currentQuestion].options
        .map((option: any, index: any) => (option.isCorrect ? index : -1))
        .filter((index: any) => index !== -1);

      const areAnswersCorrect = selectedAnswerIndices.every((index) =>
        correctAnswerIndices.includes(index)
      );

      if (areAnswersCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

      setSelectedCorrectAnswers(correctAnswerIndices);

      const incorrectAnswerIndices = questionsData[currentQuestion].options
        .map((option: any, index: any) => (!option.isCorrect ? index : -1))
        .filter((index: any) => index !== -1);
      setSelectedIncorrectAnswers(incorrectAnswerIndices);

      setAnswerRevealed(true);
      setAnswerLocked(true);
    } else {
      console.error("No answer selected");
    }
  };

  const handleNextQuestionClick = () => {
    setSelectedAnswerIndices([]);
    setShowCorrectIncorrect(false);
    setSelectedCorrectAnswers([]);
    setSelectedIncorrectAnswers([]);
    setAnswerRevealed(false);
    setAnswerLocked(false);

    const nextQuestion = currentQuestion + 1;

    if (questionsData && nextQuestion < questionsData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setAssessmentCompleted(true);
    }
  };

  const handleRestartAssessmentClick = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAssessmentCompleted(false);
    setResetAssessment(true);
    setSelectedAnswerIndices([]);
    setAnswerRevealed(false);
    setSelectedIncorrectAnswers([]);
    setSelectedCorrectAnswers([]);
    setShowCorrectIncorrect(false);
    setAnswerLocked(false);
  };

  return (
    <>
      {!assessmentCompleted ? (
        <div className={styles["assessmentQuestions-container"]}>
          <div className={styles["assessmentQuestions-img"]}></div>
          <p className={styles["assessmentQuestions-numberQuestion"]}>
            {currentQuestion + 1} de {questionsData && questionsData.length}
          </p>
          <div className={styles["assessmentQuestions-question_container"]}>
            <h3 className={styles["assessmentQuestions-question_title"]}>
              {questionsData[currentQuestion].title}
            </h3>
            <section>
              <div
                className={
                  styles["assessmentQuestions-answerOptions_container"]
                }
              >
                {renderAnswerOptions()}
              </div>
            </section>
          </div>
          <div
            className={
              styles["assessmentQuestions-checkAndNextButtons_container"]
            }
          >
            <Button
              onClick={handleCheckAnswerClick}
              className={
                selectedAnswerIndices.length > 0
                  ? styles["assessmentQuestions-checkAnswerButton"]
                  : styles["assessmentQuestions-checkAnswerButton_disabled"]
              }
              disabled={selectedAnswerIndices.length === 0}
            >
              Conocer Respuesta
            </Button>

            <Button
              onClick={handleNextQuestionClick}
              disabled={!answerRevealed}
              className={
                answerRevealed
                  ? styles["assessmentQuestions-nextQuestionButton"]
                  : styles["assessmentQuestions-nextQuestionButton_disabled"]
              }
            >
              Siguiente Pregunta
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <AssessmentFinished
            score={score}
            questions={questionsData || {}}
            onRestartAssessment={handleRestartAssessmentClick}
          />
        </div>
      )}
    </>
  );
};
