export interface Resource {
  _id: string;
  resourceUrl: string;
  title: string;
  description: string;
  typeResource: "video" | "audio" | "image" | "pdf" | "link";
  visibility: "public" | "private" | "restrictedIncourse";
  miniaturaUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ResourceOfCourse {
  _id: {
    _id: string;
    resourceUrl: string;
    title: string;
    description: string;
    typeResource: "video" | "audio" | "image" | "pdf" | "link";
    visibility: "public" | "private" | "restrictedIncourse";
    miniaturaUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
