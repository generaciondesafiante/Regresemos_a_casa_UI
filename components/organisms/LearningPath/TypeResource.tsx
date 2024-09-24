import { useAppSelector } from "../../../store/store";
import { ResourceOfCourse } from "../../../types/types/Resources";
import { LearningPathTitleClass } from "../LearningPathTitle/LearningPathTitle";
import { LearningPathVideo } from "../LearningPathVideo/LearningPathVideo";
import { PDFView } from "../PDFView/PDFView";

export const TypeResource = () => {
  const selectedResourceTopic = useAppSelector(
    (state) => state.resource.selectedResource
  );

  console.log("Selected Resource Topic:", selectedResourceTopic);

  const isResourceObject = (
    resource: any
  ): resource is ResourceOfCourse["_id"] => {
    return (
      resource && typeof resource === "object" && "typeResource" in resource
    );
  };

  // Solo accede a `typeResource` si `selectedResourceTopic?._id` es un objeto con `typeResource`
  const resourceType = isResourceObject(selectedResourceTopic?._id)
    ? selectedResourceTopic?._id.typeResource
    : undefined;

  if (resourceType === "video") {
    return (
      <>
        <LearningPathVideo />
        <LearningPathTitleClass />
      </>
    );
  } else if (resourceType === "pdf") {
    return <PDFView />;
  } else {
    return <div>No resource selected or unknown resource type</div>;
  }
};
