import { AssessmentLesson, VideoLesson } from "./lessons.type";

export interface Topic {
  topicName: string;
  sequentialTopic:string;
  _id: string;
 lessons: (VideoLesson | AssessmentLesson)[]; 
}
