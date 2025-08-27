import { Pagination } from "@/types/tables/pagination";
import { TypeOfRouteCourse } from "./createCourse-type";

export interface Course {
  topics: string[];
  _id: string;
  nameCourse: string;
  titleCourse: string;
  typeOfRoute: TypeOfRouteCourse;
  isActive?: boolean;
  __v: number;
  pagination: Pagination;
}

export interface CoursesResponse {
  courses: Course[];
  pagination: Pagination;
}
