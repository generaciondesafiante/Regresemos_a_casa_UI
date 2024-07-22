import { Resource } from "./Resources";

export interface Topic {
  topicName: string;
  sequentialTopic: string;
  _id: string;
  resources: [];
}

export interface Topic1 {
  _id: string;
  nameTopic: string;
  resources: Resource[];
}
