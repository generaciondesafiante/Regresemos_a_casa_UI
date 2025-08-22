export enum TypeOfRouteCourse {
  FLEXIBLE = "flexible",
  MANDATORY = "estrict",
}

export interface FormDataCourseCreate {
  nameCourse: string;
  titleCourse: string;
  typeOfRoute: TypeOfRouteCourse;
}

export interface responseDataCourseCreate extends FormDataCourseCreate {
  topics: [];
  _id: string;
  __v: 0;
}
