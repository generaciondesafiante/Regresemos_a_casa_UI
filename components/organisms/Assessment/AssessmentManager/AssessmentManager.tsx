"use client";
import { useState } from 'react';
import { AssessmentMain, AssessmentQuestions, AssessmentTitleSubtitleBackground, AssessmentFinished } from "../../../organisms";
import { AssessmentManagerProps } from '../../../../types/types/assessment.type';

export const AssessmentManager: React.FC<AssessmentManagerProps> = ({ onAssessmentCompleted }) => {
    const [assessmentStarted, setAssessmentStarted] = useState(false);
    const [assessmentCompleted, setAssessmentCompleted] = useState(false);

    const handleStartAssessment = () => {
        setAssessmentStarted(true);
    };

    const handleAssessmentCompleted = () => {
        setAssessmentCompleted(true);
        if (onAssessmentCompleted) {
            onAssessmentCompleted(); // Llama a la función proporcionada por props
        }        
    };

    return (
        <div>
            <AssessmentTitleSubtitleBackground />
            {!assessmentCompleted && (
                <div>
                    {!assessmentStarted ? (
                        <AssessmentMain onStartAssessment={handleStartAssessment} />
                    ) : (
                        <AssessmentQuestions/>
                    )}
                </div>
            )}
            {/* Renderiza AssessmentFinished solo cuando la evaluación está completa */}
            {assessmentCompleted && (
                <div>
                    <AssessmentFinished/>
                </div>
            )}
        </div>
    );
};
