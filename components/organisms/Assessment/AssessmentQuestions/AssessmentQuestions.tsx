"use client";
import { useState } from "react";
import { Button } from "../../../atoms";
import { AssessmentFinished } from "../AssessmentFinished/AssessmentFinished";
import { questionsData } from "../AssessmentQuestionsData";
import styles from "./AssessmentQuestions.module.css";

export const AssessmentQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [resetAssessment, setResetAssessment] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
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
    const currentQuestionData = questionsData[currentQuestion];

    if (!currentQuestionData || !currentQuestionData.options) {
      return null;
    }
    return questionsData[currentQuestion].options.map((option, index) => {
      const isSelected = selectedAnswerIndex === index;
      const isCorrect = selectedCorrectAnswers.includes(index);
      const isIncorrect = selectedIncorrectAnswers.includes(index);
      const isRevealed = answerRevealed && isSelected;

      const buttonClass = [
        styles["assessmentQuestions-answerOptions_button"],
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
          onClick={() => !answerLocked && setSelectedAnswerIndex(index)}
        >
          {option.textAnswer}
        </Button>
      );
    });
  };

  const handleCheckAnswerClick = () => {
    if (selectedAnswerIndex !== null) {
      setShowCorrectIncorrect(true);

      const correctAnswerIndices = questionsData[currentQuestion].options
        .map((option, index) => (option.isCorrect ? index : -1))
        .filter((index) => index !== -1);

      const isAnswerCorrect =
        correctAnswerIndices.includes(selectedAnswerIndex);

      if (isAnswerCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

      setSelectedCorrectAnswers(correctAnswerIndices);

      const incorrectAnswerIndices = questionsData[currentQuestion].options
        .map((option, index) => (!option.isCorrect ? index : -1))
        .filter((index) => index !== -1);
      setSelectedIncorrectAnswers(incorrectAnswerIndices);

      setAnswerRevealed(true);
      setAnswerLocked(true);
    } else {
      console.log("No answer selected");
    }
  };

  const handleNextQuestionClick = () => {
    setSelectedAnswerIndex(null);
    setShowCorrectIncorrect(false);
    setSelectedCorrectAnswers([]);
    setSelectedIncorrectAnswers([]);
    setAnswerRevealed(false);
    setAnswerLocked(false);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questionsData.length) {
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
    setSelectedAnswerIndex(null);
    setAnswerRevealed(false);
    setSelectedIncorrectAnswers([]);
    setSelectedCorrectAnswers([]);
    setShowCorrectIncorrect(false);
    setAnswerLocked(false);
  };
  return (
    <div className={styles["assessment-prueba"]}>
      {!assessmentCompleted ? (
        <div className={styles["assessmentQuestions-container"]}>
          <div className={styles["assessmentQuestions-img"]}></div>
          <p className={styles["assessmentQuestions-numberQuestion"]}>
            {currentQuestion + 1} de {questionsData.length}
          </p>
          <div className={styles["ensayo"]}>
            <div className={styles["assessmentQuestions-question_container"]}>
              <h3 className={styles["assessmentQuestions-question_title"]}>
                {questionsData[currentQuestion].title}
              </h3>
              <section
                className={
                  styles["assessmentQuestions-answerOptions_buttons_content"]
                }
              >
                <div
                  className={
                    styles["assessmentQuestions-answerOptions_container"]
                  }
                >
                  {renderAnswerOptions()}
                </div>
                <div
                  className={
                    styles[
                      "assessmentQuestions-answersOpscions_container_next_and_qestions"
                    ]
                  }
                >
                  <Button
                    onClick={handleCheckAnswerClick}
                    disabled={selectedAnswerIndex === null}
                  >
                    Conocer Respuesta
                  </Button>
                  <Button
                    onClick={handleNextQuestionClick}
                    disabled={!answerRevealed}
                  >
                    Siguiente Pregunta
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <AssessmentFinished
            score={score}
            questions={questionsData}
            onRestartAssessment={handleRestartAssessmentClick}
          />
        </div>
      )}
    </div>
  );
};
