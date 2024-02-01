"use client";
import { AssessmentFinished } from "../AssessmentFinished/AssessmentFinished";
import { ArrowRightIcon, Button } from "../../../atoms";
import styles from "./AssessmentQuestions.module.css";
import { useState, useEffect } from "react";

type SingleChoiceQuestion = {
  title: string;
  image: string;
  questionType: "single";
  options: {
    textAnswer: string;
    isCorrect: boolean;
  }[];
};

type TrueFalseQuestion = {
  title: string;
  image: string;
  questionType: "trueFalse";
  options: {
    textAnswer: string;
    isCorrect: boolean;
  }[];
};

type MultipleChoiceQuestion = {
  title: string;
  image: string;
  questionType: "multiple";
  options: {
    textAnswer: string;
    isCorrect: boolean;
  }[];
};

type Question =
  | SingleChoiceQuestion
  | TrueFalseQuestion
  | MultipleChoiceQuestion;

export const questions: Question[] = [
  {
    title: "¿ Cuál es el primogenito de abraham ?",
    image: "esto es una imagen",
    questionType: "single",
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
    questionType: "multiple",
    options: [
      { textAnswer: "cristian", isCorrect: false },
      { textAnswer: "daniel", isCorrect: false },
      { textAnswer: "Isaac", isCorrect: true },
      { textAnswer: "Ismael", isCorrect: true },
    ],
  },
  {
    title: "¿ Abraham significa... Padre ?",
    image: "esto es una imagen",
    questionType: "trueFalse",
    options: [
      { textAnswer: "Falso", isCorrect: true },
      { textAnswer: "Verdadero", isCorrect: false },
    ],
  },

  {
    title: "¿ Abraham significa... Padre ?",
    image: "esto es una imagen",
    questionType: "trueFalse",
    options: [
      { textAnswer: "Falso", isCorrect: true },
      { textAnswer: "Verdadero", isCorrect: false },
    ],
  },

  {
    title: "¿ Cuáles son los hijos de abraham2 ?",
    image: "esto es una imagen",
    questionType: "multiple",
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
    questionType: "single",
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
    questionType: "single",
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
    questionType: "single",
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
    questionType: "trueFalse",
    options: [
      { textAnswer: "Falso", isCorrect: true },
      { textAnswer: "Verdadero", isCorrect: false },
    ],
  },
  {
    title: "¿ Cuáles fueron las promesas que le dio Dios ?",
    image: "esto es una imagen",
    questionType: "multiple",
    options: [
      {
        textAnswer: "Descendencia como las estrellas de la arena",
        isCorrect: true,
      },
      {
        textAnswer: "Benditas en ti todas las familias de la tierra",
        isCorrect: true,
      },
      { textAnswer: "Un territorio que fluye leche y miel", isCorrect: true },
      { textAnswer: "Que tendria varias esposas", isCorrect: false },
    ],
  },
];

export const AssessmentQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(
    null
  );
  const [correctButtonIndex, setCorrectButtonIndex] = useState<number[]>([]);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [resetAssessment, setResetAssessment] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState<number[]>(
    []
  );
  const [showCorrectIncorrect, setShowCorrectIncorrect] = useState(false);
  const [selectedAnswerCorrect, setSelectedAnswerCorrect] = useState(false);

  useEffect(() => {
    if (resetAssessment) {
      resetAssessmentState();
    }
  }, [resetAssessment]);

  const resetAssessmentState = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedButtonIndex(null);
    setCorrectButtonIndex([]);
    setAssessmentCompleted(false);
    setShowScore(false);
    setAnswerVisible(false);
    setResetAssessment(false);
  };

  const isAnswerCorrect = (index: number) =>
    questions[currentQuestion]?.options[index]?.isCorrect || false;

  useEffect(() => {
    const currentOptions = questions[currentQuestion]?.options || [];
    const correctIndices = currentOptions
      .map((option, index) => (option.isCorrect ? index : undefined))
      .filter((index) => index !== undefined) as number[];
    setCorrectButtonIndex(correctIndices);
    setSelectedButtonIndex(null); // Reset selected button index when question changes
  }, [currentQuestion]);

  // const handleAnswerSubmit = (index: number) => {
  //   const currentQuestionType = questions[currentQuestion]?.questionType;

  //   if (
  //     currentQuestionType === "single" ||
  //     currentQuestionType === "trueFalse"
  //   ) {
  //     setSelectedAnswerIndices([index]);
  //     setSelectedButtonIndex(index); // Set selected button index for single selection
  //   } else {
  //     // Multiple choice question
  //     const updatedIndices = selectedAnswerIndices.includes(index)
  //       ? selectedAnswerIndices.filter((i) => i !== index)
  //       : [...selectedAnswerIndices, index];

  //     setSelectedAnswerIndices(updatedIndices);

  //     // Update selected button index for multiple selection
  //     setSelectedButtonIndex(
  //       updatedIndices.length > 0 ? updatedIndices[0] : null
  //     );
  //   }
  // };
  const handleAnswerSubmit = (index: number) => {
    const currentQuestionType = questions[currentQuestion]?.questionType;
    console.log(currentQuestionType);

    if (
      currentQuestionType === "single" ||
      currentQuestionType === "trueFalse"
    ) {
      setSelectedAnswerIndices([index]);
      setSelectedButtonIndex(index);
      setSelectedAnswerCorrect(isAnswerCorrect(index));
    } else {
      // Multiple choice question
      const updatedIndices = selectedAnswerIndices.includes(index)
        ? selectedAnswerIndices.filter((i) => i !== index)
        : [...selectedAnswerIndices, index];

      setSelectedAnswerIndices(updatedIndices);

      // Update selected button index for multiple selection
      setSelectedButtonIndex(
        updatedIndices.length > 0 ? updatedIndices[0] : null
      );

      // Check if the selected answer is correct in multiple choice questions
      setSelectedAnswerCorrect(updatedIndices.every((i) => isAnswerCorrect(i)));
    }
    console.log(
      "Respuesta seleccionada:",
      questions[currentQuestion]?.options[index]?.textAnswer
    );
    console.log(
      "Respuestas correctas:",
      correctButtonIndex.map(
        (i) => questions[currentQuestion]?.options[i]?.textAnswer
      )
    );
    console.log("Respuesta es correcta:", isAnswerCorrect(index));
  };

  const showCorrectAnswer = () => {
    setShowCorrectIncorrect(true);

    // Obtén los índices de las respuestas seleccionadas
    const selectedIndices = selectedAnswerIndices;

    // Obtén los índices de las respuestas correctas
    const correctIndices = correctButtonIndex;

    // Compara los arreglos de índices para determinar si son iguales
    const isCorrect =
      JSON.stringify(selectedIndices.sort()) ===
      JSON.stringify(correctIndices.sort());

    console.log(
      "Respuestas seleccionadas:",
      selectedIndices.map(
        (i) => questions[currentQuestion]?.options[i]?.textAnswer
      )
    );
    console.log(
      "Respuestas correctas:",
      correctIndices.map(
        (i) => questions[currentQuestion]?.options[i]?.textAnswer
      )
    );
    console.log("Respuesta es correcta:", isCorrect);
  };

  const advanceToNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setAssessmentCompleted(true);
      setShowScore(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);

      // Reinicia el estado de selectedAnswerIndices
      setSelectedAnswerIndices([]);

      setSelectedButtonIndex(null);
      setCorrectButtonIndex([]);
      setAnswerVisible(false);
    }
  };

  return (
    <div className={styles["assessment-prueba"]}>
      {!assessmentCompleted ? (
        <div className={styles["assessmentQuestions-container"]}>
          <div className={styles["assessmentQuestions-img"]}></div>
          <p className={styles["assessmentQuestions-numberQuestion"]}>
            {currentQuestion + 1} de {questions.length}
          </p>
          <div className={styles["ensayo"]}>
            <div className={styles["assessmentQuestions-question_container"]}>
              <h3 className={styles["assessmentQuestions-question_title"]}>
                {questions[currentQuestion].title}
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
                  {questions[currentQuestion].options.map((answer, index) => (
                    <Button
                      key={answer.textAnswer}
                      className={`
                          ${styles["assessmentQuestions-answerOptions_button"]} 
                          ${
                            styles[
                              "assessmentQuestions-answer_button" + (index + 1)
                            ]
                          } 
                          ${
                            selectedButtonIndex === index
                              ? styles["selected"]
                              : ""
                          }
                          ${
                            showCorrectIncorrect &&
                            answer.isCorrect &&
                            selectedAnswerCorrect
                              ? styles["true"]
                              : showCorrectIncorrect &&
                                !answer.isCorrect &&
                                !selectedAnswerCorrect
                              ? styles["incorrect"]
                              : ""
                          }
                        `}
                      onClick={() => handleAnswerSubmit(index)}
                      disabled={answerVisible}
                    >
                      {answer.textAnswer}
                    </Button>
                  ))}
                </div>
                <Button
                  onClick={() => {
                    showCorrectAnswer();
                    setAnswerVisible(true);
                  }}
                  disabled={answerVisible}
                >
                  Conocer Respuesta
                </Button>
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
                className={styles["assessmentQuestions-nextButton"]}
                onClick={advanceToNextQuestion}
                disabled={selectedButtonIndex === null || !answerVisible}
              >
                <ArrowRightIcon />
              </button>
            </section>
          </div>
        </div>
      ) : (
        <div>
          <AssessmentFinished
            score={score}
            questions={questions}
            onRestartAssessment={() => setResetAssessment(true)}
          />
        </div>
      )}
    </div>
  );
};
