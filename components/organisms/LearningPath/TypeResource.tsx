import { useAppSelector } from "../../../store/store";
import { AssessmentConditinalView } from "../Assessment/AssessmentConditinalView/AssessmentConditinalView";
import { LearningPathTitleClass } from "../LearningPathTitle/LearningPathTitle";
import { LearningPathVideo } from "../LearningPathVideo/LearningPathVideo";
import { PDFView } from "../PDFView/PDFView";

export const TypeResource = () => {
  const selectedResourceTopic = useAppSelector(
    (state) => state.resource.selectedResource
  );
  const resourceType = selectedResourceTopic?.typeResource;
  if (resourceType === "video") {
    return (
      <>
        <LearningPathVideo />
        <LearningPathTitleClass />
      </>
    );
  } else if (resourceType === "pdf") {
    return <PDFView />;
  }
};
