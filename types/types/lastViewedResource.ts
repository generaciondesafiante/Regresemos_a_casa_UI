import { Resource } from "./Resources";

export interface LastViewedResource {
  _id: string;
  courseName: string;
  courseId: string;
  topicName: string;
  topicId: string;
  resource: Resource;
}
