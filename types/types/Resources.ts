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
  _id: string;
  createdAt: string;
  description: string;
  miniaturaUrl: string;
  resourceUrl: string;
  title: string;
  typeResource: ResourceType;
  updatedAt: string;
  visibility: VisibilityType;
  __v?: number;
}
