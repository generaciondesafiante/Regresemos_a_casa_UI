"use client";
import { AssessmentFinished } from "../AssessmentFinished/AssessmentFinished"
import { ArrowRightIcon } from "../../../atoms";
import styles from "./AssessmentQuestions.module.css";
import { useState, useEffect } from 'react';

export const questions = [
  {
    title: "¿ Cuál es el primogenito de abraham ?",
    image: "esto es una imagen",
    options: [
      { textAnswer: "Jose", isCorrect: false },
      { textAnswer: "Ismael", isCorrect: false },
      { textAnswer: "Isaac", isCorrect: true },
      { textAnswer: "Jacob", isCorrect: false },
    ],
  },
  {
    title: "¿ Cuáles son los hijos de abraham ?",
    image: "esto es una imagen",
    options: [
      { textAnswer: "cristian", isCorrect: false },
      { textAnswer: "daniel", isCorrect: false },
      { textAnswer: "Isaac", isCorrect: true },
      { textAnswer: "Ismael", isCorrect: true },
    ],
  },
  {
    title: "¿ Cuáles son los hijos de abraham2 ?",
    image: "esto es una imagen",
    options: [
      { textAnswer: "cristian2", isCorrect: false },
      { textAnswer: "daniel2", isCorrect: false },
      { textAnswer: "Isaac2", isCorrect: true },
      { textAnswer: "Ismael2", isCorrect: true },
    ],
  },
  {
    title: "¿ Cuál es el primogenito de abraham 2?",
    image: "esto es una imagen",
    options: [
      { textAnswer: "Jose2", isCorrect: false },
      { textAnswer: "Ismael2", isCorrect: false },
      { textAnswer: "Isaac2", isCorrect: true },
      { textAnswer: "Jacob2", isCorrect: false },
    ],
  },
  {
    title: "¿ Cuál es el primogenito de abraham ?",
    image: "esto es una imagen",
    options: [
      { textAnswer: "Jose", isCorrect: false },
      { textAnswer: "Ismael", isCorrect: false },
      { textAnswer: "Isaac", isCorrect: true },
      { textAnswer: "Jacob", isCorrect: false },
    ],
  },
  {
    title: "¿ Cuál es el primogenito de abraham ?",
    image: "esto es una imagen",
    options: [
      { textAnswer: "Jose", isCorrect: false },
      { textAnswer: "Ismael", isCorrect: false },
      { textAnswer: "Isaac", isCorrect: true },
      { textAnswer: "Jacob", isCorrect: false },
    ],
  },
  {
    title: "¿ Abraham significa... Padre ?",
    image: "esto es una imagen",
    options: [
      { textAnswer: "Falso", isCorrect: true },
      { textAnswer: "Verdadero", isCorrect: false },
    ],
  },
  {
    title: "¿ Abraham significa... Padre ?",
    image: "esto es una imagen",
    options: [
      { textAnswer: "Falso", isCorrect: true },
      { textAnswer: "Verdadero", isCorrect: false },
    ],
  },
  {
    title: "¿ Abraham significa... Padre ?",
    image: "esto es una imagen",
    options: [
      { textAnswer: "Falso", isCorrect: true },
      { textAnswer: "Verdadero", isCorrect: false },
    ],
  },
  {
    title: "¿ Cuáles fueron las promesas que le dio Dios ?",
    image: "esto es una imagen",
    options: [
      { textAnswer: "Descendencia como las estrellas de la arena", isCorrect: true },
      { textAnswer: "Benditas en ti todas las familias de la tierra", isCorrect: true },
      { textAnswer: "Un territorio que fluye leche y miel", isCorrect: true },
      { textAnswer: "Que tendria varias esposas", isCorrect: false },
    ],
  },
]

export const AssessmentQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
  const [correctButtonIndex, setCorrectButtonIndex] = useState<number | null>(null);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [showScore, setShowScore] = useState(false);
  const [resetAssessment, setResetAssessment] = useState(false);

  useEffect(() => {
    const currentOptions = questions[currentQuestion].options;
    const countCorrect = currentOptions.filter((option) => option.isCorrect).length;

    if (countCorrect === 1 && selectedButtonIndex !== null) {
      setCorrectButtonIndex(
        currentOptions.findIndex((option) => option.isCorrect)
      );
    }
  }, [currentQuestion, selectedButtonIndex]);

  useEffect(() => {
    if (resetAssessment) {
      setCurrentQuestion(0);
      setScore(0);
      setSelectedButtonIndex(null);
      setCorrectButtonIndex(null);
      setAssessmentCompleted(false);
      setSelectedOptions([]);
      setShowScore(false);
      setResetAssessment(false);
    }
  }, [resetAssessment]);

  const isAnswerCorrect = (index: number) => {
    return questions[currentQuestion].options[index].isCorrect;
  };

  const handleAnswerSubmit = (index: number) => {
    setSelectedButtonIndex(index);

    const isCorrect = isAnswerCorrect(index);
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setCorrectButtonIndex(
        questions[currentQuestion].options.findIndex((option) => option.isCorrect)
      );
    }
  };

  const advanceToNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setAssessmentCompleted(true);
      setShowScore(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedButtonIndex(null);
      setCorrectButtonIndex(null);
    }
  };

  return (
    <>
      {!assessmentCompleted ? (
        <div className={styles["assessmentQuestions__container--questions"]}>
          <section>
            <div className={styles["assessmentQuestions__img"]}></div>
          </section>
          <section>
            <p className={styles["assessmentQuestions__numberQuestion"]}>{currentQuestion + 1} de {questions.length} </p>
          </section>
          <div className={styles["assessmentQuestions__container--buttons"]}>
            <section className={styles["assessmentQuestions__content--titleQuestion"]}>
              <span className={styles["assessmentQuestions__titleQuestion"]}>{questions[currentQuestion].title}</span>
            </section>
            <section className={styles["assessmentQuestions__content--buttons"]}>
              <div className={styles['assessmentQuestions__row']}>
                {questions[currentQuestion].options.map((answer, index) => (
                  <button
                    key={answer.textAnswer}
                    className={`${styles['assessmentQuestions__button']} ${styles['button' + (index + 1)]} ${selectedButtonIndex !== null
                      ? index === selectedButtonIndex
                        ? isAnswerCorrect(index)
                          ? styles['correct']
                          : styles['incorrect']
                        : index === correctButtonIndex
                          ? styles['correct']
                          : styles['inactive']
                      : styles['active']
                      }`}
                    onClick={() => handleAnswerSubmit(index)}
                    disabled={selectedButtonIndex !== null}
                  >
                    {answer.textAnswer}
                  </button>
                ))}
              </div>
            </section>
          </div>
          <section>
            {showScore && (
              <AssessmentFinished
                score={score}
                questions={questions}
                onRestartAssessment={() => setResetAssessment(true)}
              />
            )}
            <button
              className={styles["assessmentQuestions__button--next"]}
              onClick={advanceToNextQuestion}
              disabled={selectedButtonIndex === null}
            >
              {currentQuestion === questions.length - 1 ? "Fin" : ""}
              <ArrowRightIcon />
            </button>
          </section>
        </div>
      ) : (
        <div>
          <AssessmentFinished score={score} questions={questions} onRestartAssessment={() => setResetAssessment(true)} />
        </div>
      )
      }
    </>
  );
};