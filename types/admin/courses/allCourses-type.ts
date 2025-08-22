import { Pagination } from "@/types/tables/pagination";

export interface Course {
  topics: string[];
  _id: string;
  nameCourse: string;
  titleCourse: string;
  typeOfRoute: string;
  __v: number;
  pagination: Pagination;
}

export interface CoursesResponse {
  courses: Course[];
  pagination: Pagination;
}