export enum TypeResource {
  VIDEO = "video",
  AUDIO = "audio",
  IMAGE = "image",
  PDF = "pdf",
  LINK = "link",
}

export enum Visibility {
  PUBLIC = "public",
  ONLY_COURSE = "only_course",
}

export interface Resource {
  resourceUrl: string;
  title: string;
  description: string;
  typeResource: TypeResource;
  visibility: Visibility;
  miniaturaUrl: string;
}
