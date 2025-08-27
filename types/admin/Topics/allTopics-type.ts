import { Pagination } from "@/types/tables/pagination";
import { FormDataCourseCreate } from "../courses/createCourse-type";

// src/types/admin/Topics/topic-type.ts

export type Topic = {
  _id?: string;
  nameTopic?: string;
  resources?: Resource[];
  isActive?: boolean;
  __v?: number;
};

export type Resource = {
  _id: string;
  isMandatory?: boolean;
  title?: string;
  typeResource?: string;
};

export interface resoucesToTopic {
  _id: string;
  title: string;
  typeResource: string;
}

export interface TopicTableResponse {
  course: FormDataCourseCreate;
  topics: Topic[];
  pagination: Pagination;
}

export interface TopicCreateRequest {
  nameTopic: string;
  courseId: string;
}

export interface TopicCreateResponse {
  ok: boolean;
  topic: Topic;
}

export interface TopicByIdResponse {
  topic: { _id: string; nameTopic: string; isActive: boolean };
}

export interface TopicInitialState {
  _id: string;
  nameTopic: string;
  resources: resoucesToTopic[];
  isActive: boolean;
  __v: number;
}

export interface ResourceToTopicRequest {
  topic: TopicInitialState;
  pagination: Pagination;
}

export interface ResponseDeletTopic {
  ok: boolean;
  messege: string;
}
