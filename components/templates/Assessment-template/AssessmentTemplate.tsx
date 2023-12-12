"use client";
import { useState } from 'react'
import { AssessmentMain, AssessmentQuestions, AssessmentTitleSubtitleBackground, AssessmentFinished } from "../../organisms";

interface AssessmentTemplateProps {
    onAssessmentCompleted: () => void;
}

export const AssessmentTemplate: React.FC<AssessmentTemplateProps> = ({ onAssessmentCompleted }) => {
    const [assessmentStarted, setAssessmentStarted] = useState(false);
    const [assessmentCompleted, setAssessmentCompleted] = useState(false);

    const handleStartAssessment = () => {
        setAssessmentStarted(true);
    };

    const handleAssessmentCompleted = () => {
        setAssessmentCompleted(true);
        onAssessmentCompleted(); // Llama a la función proporcionada por props
    };

    return (
        <div>
            <AssessmentTitleSubtitleBackground />
            {!assessmentCompleted && (
                <div>
                    {!assessmentStarted ? (
                        <AssessmentMain onStartAssessment={handleStartAssessment} />
                    ) : (
                        <AssessmentQuestions onAssessmentCompleted={handleAssessmentCompleted} />
                    )}
                </div>
            )}
            {/* Renderiza AssessmentFinished solo cuando la evaluación está completa */}
            {assessmentCompleted && (
                <div>
                    <AssessmentFinished />
                </div>
            )}
        </div>
    );
};