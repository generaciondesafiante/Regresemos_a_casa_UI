import { useAppSelector } from "../../../store/store";
import { LearningPathTitleClass } from "../LearningPathTitle/LearningPathTitle";
import { LearningPathVideo } from "../LearningPathVideo/LearningPathVideo";
import { PDFView } from "../PDFView/PDFView";

export const TypeResource = () => {
  const selectedResourceTopic = useAppSelector(
    (state) => state.resource.selectedResource
  );
  const resourceType = selectedResourceTopic?._id.typeResource;
 
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
