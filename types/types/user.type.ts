import { Resource } from "./Resources";

export interface User {
  ok: boolean;
  uid: string;
  lastname: string;
  name: string;
  email: string;
  city: string;
  country: string;
  phone: number | null;
  image: string;
  admin: boolean;
  CourseProgress: CourseProgress[];
  lastViewedVideos: LastViewedResource[];
}

export interface CourseProgress {
  _id: string;
  course: string;
  lastViewedTopic: {
    topic: TopicProgress[];
  };
}

export interface TopicProgress {
  _id: string;
  topicId: string;
  lastViewedResource: Resource;
}

export interface LastViewedResource {
  _id: string;
  courseName: string;
  courseId: string;
  topicName: string;
  topicId: string;
  resource: Resource;
}
