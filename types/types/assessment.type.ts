export interface AssessmentFinishedProps {
    score?: number;
    questions?: {
        title: string;
        image: string;
        options: {
            textAnswer: string;
            isCorrect: boolean;
        }[];
    }[];
    onRestartAssessment?: () => void;
}

export interface AssessmentMainProps {
    onStartAssessment: () => void;
}

export interface AssestmentConditionalView {
    onAssessmentCompleted?: () => void;
}