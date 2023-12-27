"use client";
import { useState } from 'react'
import { AssessmentMain, AssessmentQuestions, AssessmentTitleSubtitleBackground, AssessmentFinished } from "../../organisms";
import { AssessmentTemplateProps } from '../../../types/types/assessment.type';

export const AssessmentTemplate: React.FC<AssessmentTemplateProps> = () => {
    const [assessmentStarted, setAssessmentStarted] = useState(false);
    const [assessmentCompleted, setAssessmentCompleted] = useState(false);

    const handleStartAssessment = () => {
        setAssessmentStarted(true);
    };

    return (
        <div>
            <AssessmentTitleSubtitleBackground />
            {!assessmentCompleted && (
                <div>
                    {!assessmentStarted ? (
                        <AssessmentMain onStartAssessment={handleStartAssessment} />
                    ) : (
                        <AssessmentQuestions />
                    )}
                </div>
            )}
            {assessmentCompleted && (
                <div>
                    <AssessmentFinished />
                </div>
            )}
        </div>
    );
};