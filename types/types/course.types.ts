import { AssessmentLesson, VideoLesson } from "./lessons.type";

type CourseType = "strict" | "flexible";
export interface Course {
  _id: string;
  typeOfRoute: CourseType;
  nameCourse: string;
  topicName: string;
  topic: Array<{
    nameTopic: string;
    _id: string;
    sequentialTopic: string;
    lessons: (VideoLesson | AssessmentLesson)[];
  }>;
}
