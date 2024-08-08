export interface LastViewedResource {
  _id: string;
  courseName: string;
  courseId: string;
  topicName: string;
  topicId: string;
  resource: {
    _id: string;
    createdAt: string;
    updatedAt: string;
    resourceUrl: string;
    title: string;
    description: string;
    typeResource: string;
    visibility: string;
    miniaturaUrl: string;
  };
}
