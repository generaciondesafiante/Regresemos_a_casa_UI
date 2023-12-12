"use client";
import { AssessmentFinished } from "../..";
import styles from "./AssessmentQuestions.module.css";
import { useState, useEffect } from 'react';

const questions = [
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

  useEffect(() => {
    // Verificar si la pregunta actual tiene solo una respuesta correcta
    const currentOptions = questions[currentQuestion].options;
    const countCorrect = currentOptions.filter((option) => option.isCorrect).length;

    // Deshabilitar botones después de seleccionar uno si hay solo un valor "true"
    if (countCorrect === 1 && selectedButtonIndex !== null) {
      setCorrectButtonIndex(
        currentOptions.findIndex((option) => option.isCorrect)
      );
    }
  }, [currentQuestion, selectedButtonIndex]);

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
      // Si es la última pregunta, actualizar el estado para indicar que la evaluación ha terminado
      setAssessmentCompleted(true);
    } else {
      // Si no es la última pregunta, avanzar a la siguiente pregunta
      setCurrentQuestion((prev) => prev + 1);
      setSelectedButtonIndex(null);
      setCorrectButtonIndex(null);
    }
  };

  return (
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
        <p>Puntuación: {score}</p>
        <button
          onClick={advanceToNextQuestion}
          disabled={selectedButtonIndex === null} // Deshabilitar el botón hasta que se seleccione una respuesta
        >
          {currentQuestion === questions.length - 1 ? "Terminar Evaluación" : "Siguiente"}
        </button>
      </section>
      {/* Renderiza AssessmentFinished solo cuando la evaluación está completa */}
      {assessmentCompleted && (
        <div>
          <AssessmentFinished />
        </div>
      )}
    </div>
  );
};