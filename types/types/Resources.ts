export interface SelectedResource {
  _id: string;
  createdAt: string;
  description: string;
  miniaturaUrl: string;
  resourceUrl: string;
  title: string;
  typeResource: string;
  updatedAt: string;
  visibility: string;
  __v: number;
}
type ResourceType = "video" | "audio" | "image" | "pdf" | "link";
type VisibilityType = "public" | "private" | "restrictedInCourse";
export interface Resource {
  _id: {
    _id: string;
    resourceUrl: string;
    title: string;
    description: string;
    typeResource: ResourceType;
    visibility: VisibilityType;
    miniaturaUrl: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  };
}
