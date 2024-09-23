import { Resource, ResourceOfCourse } from "./Resources";

export interface Topic {
  _id: string;
  nameTopic: string;
  resources: ResourceOfCourse[];
}

export interface Topic1 {
  _id: string;
  nameTopic: string;
  resources: Resource[];
}
