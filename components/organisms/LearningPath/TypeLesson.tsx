import { useAppSelector } from "../../../store/store";
import { AssessmentConditinalView } from "../Assessment/AssessmentConditinalView/AssessmentConditinalView";
import { LearningPathTitleClass } from "../LearningPathTitle/LearningPathTitle";
import { LearningPathVideo } from "../LearningPathVideo/LearningPathVideo";

export const TypeLesson = () => {
  const selectedLesson = useAppSelector(
    (state) => state.lessons.selectedLesson
  );

  const lessonType = selectedLesson?.typeLesson;

  if (lessonType === "video") {
    return (
      <>
        <LearningPathVideo />
        <LearningPathTitleClass />
      </>
    );
  } else if (lessonType === "assessment") {
    return <AssessmentConditinalView />;
  }
};
