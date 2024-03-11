import { AssessmentLesson, VideoLesson } from "./lessons.type";

export interface Course {
  _id: string;
  mandatory: boolean;
  courseName: string;
  topicName: string;
  topics: Array<{
    topicName: string;
    _id: string;
    sequentialTopic: string;
   lessons: (VideoLesson | AssessmentLesson)[]; 
  }>;
}
