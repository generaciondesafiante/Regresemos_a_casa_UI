export interface AssessmentFinishedProps {
    score: number;
    questions: {
        title: string;
        image: string;
        options: {
            textAnswer: string;
            isCorrect: boolean;
        }[];
    }[];
    onRestartAssessment: () => void;
}