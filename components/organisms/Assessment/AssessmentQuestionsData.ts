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

export const questionsData: Question[] = [
  {
    title: "¿ Cuál es el primogenito de abraham ?",
    image: "esto es una imagen",
    questionType: "single",
    options: [
      { textAnswer: "Jose", isCorrect: false },
      { textAnswer: "Ismael", isCorrect: false },
      { textAnswer: "Jacob", isCorrect: false },
      { textAnswer: "Isaac", isCorrect: true },
    ],
  },
  {
    title: "¿ Abraham significa... Padre ?",
    image: "esto es una imagen",
    questionType: "trueFalse",
    options: [
      { textAnswer: "Verdadero", isCorrect: false },
      { textAnswer: "Falso", isCorrect: true },
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
];
