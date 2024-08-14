import { Topic } from "./topic.type";

export interface Course {
  _id: string;
  nameCourse: string;
  titleCourse: string;
  typeOfRoute: "strict" | "flexible";
  topic: Topic[];
  __v: number;
}
