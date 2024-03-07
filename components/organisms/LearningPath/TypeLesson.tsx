import { useAppSelector } from "../../../store/store";
import { AssessmentConditinalView } from "../Assessment/AssessmentConditinalView/AssessmentConditinalView";
import { AssessmentMain } from "../Assessment/AssessmentMain/AssessmentMain";
import { LearningPathTitleClass } from "../LearningPathTitle/LearningPathTitle";
import { LearningPathVideo } from "../LearningPathVideo/LearningPathVideo";

export const TypeLesson = () => {
  const selectedLesson = useAppSelector(
    (state) => state.lessons.selectedLesson
  );
  if (selectedLesson?.typeLesson === "video") {
    return (
      <>
        <LearningPathVideo />
        <LearningPathTitleClass />
      </>
    );
  } else if (selectedLesson?.typeLesson === "assessment") {
    return <AssessmentConditinalView />;
  }
};
