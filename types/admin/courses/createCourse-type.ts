export enum TypeOfRouteCourse {
  FLEXIBLE = "flexible",
  MANDATORY = "strict",
}

export interface FormDataCourseCreate {
  nameCourse?: string;
  titleCourse?: string;
  typeOfRoute?: TypeOfRouteCourse;
  isActive?: boolean;
}

export interface responseDataCourseCreate extends FormDataCourseCreate {
  topics: [];
  _id: string;
  __v: 0;
}
