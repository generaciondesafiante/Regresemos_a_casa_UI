import axiosInstance, { handleAxiosError } from "@/config/axios/instance";
import { CoursesResponse } from "@/types/admin/courses/allCourses-type";
import {
  FormDataCourseCreate,
  responseDataCourseCreate,
} from "@/types/admin/courses/createCourse-type";
import { Params } from "@/types/tables/params";
import { create } from "domain";
import { get } from "http";

export const allCoursesTableService = {
  async getAllCoursesTable(params: Params): Promise<CoursesResponse> {
    try {
      const response = await axiosInstance.get<CoursesResponse>(`/course`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async createCourse(
    data: FormDataCourseCreate,
    idUser: string | null = null
  ): Promise<responseDataCourseCreate> {
    try {
      const response = await axiosInstance.post<responseDataCourseCreate>(
        `/course/${idUser}`,
        {
          ...data,
        }
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async updateCourse(
    idCourse: string,
    data: FormDataCourseCreate
  ): Promise<responseDataCourseCreate> {
    try {
      const response = await axiosInstance.patch<responseDataCourseCreate>(
        `/course/${idCourse}`,
        {
          ...data,
        }
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async getCourseById(
    idCourse: string
  ): Promise<responseDataCourseCreate> {
    try {
      const response = await axiosInstance.get<responseDataCourseCreate>(
        `/course/${idCourse}`
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  }
};
