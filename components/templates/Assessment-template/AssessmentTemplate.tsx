import { AssessmentMain, AssessmentQuestions, AssessmentTitleSubtitleBackground } from "../../organisms";

export const AssessmentTemplate: React.FC = () => {
    return (        
        <div>
            <AssessmentTitleSubtitleBackground />;
            {/* <AssessmentMain /> */}
            <AssessmentQuestions />
        </div>
    );
};