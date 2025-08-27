import axiosInstance, { handleAxiosError } from "@/config/axios/instance";
import {
  ResourceToTopicRequest,
  Topic,
  TopicByIdResponse,
  TopicCreateRequest,
  TopicCreateResponse,
  TopicTableResponse,
  ResponseDeletTopic,
} from "@/types/admin/Topics/allTopics-type";
import { Params } from "@/types/tables/params";

export const allTopicsCourseTableService = {
  async getAllTopicsTable(
    idCourse: string,
    params: Params
  ): Promise<TopicTableResponse> {
    try {
      const response = await axiosInstance.get<TopicTableResponse>(
        `/topics/${idCourse}`,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async getTopicById(
    userId: string,
    idTopic: string
  ): Promise<TopicByIdResponse> {
    try {
      const response = await axiosInstance.get<TopicByIdResponse>(
        `/topics/topicById/${userId}/${idTopic}`
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async createTopic(
    userId: string,
    topic: TopicCreateRequest
  ): Promise<TopicCreateResponse> {
    try {
      const response = await axiosInstance.post<TopicCreateResponse>(
        `/topics/${userId}/createTopic`,
        topic
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async resourseToTopic(
    userId: string,
    topicId: string,
    params: Params
  ): Promise<ResourceToTopicRequest> {
    try {
      const response = await axiosInstance.get<ResourceToTopicRequest>(
        `/topics/${userId}/${topicId}/resourcesToTopicTable`,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async updateTopic(topicId: string, data: Topic): Promise<Topic> {
    try {
      const response = await axiosInstance.patch<Topic>(`/topics/${topicId}`, {
        ...data,
      });
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async deleteTopic(
    topicId: string,
    userId: string
  ): Promise<ResponseDeletTopic> {
    try {
      const response = await axiosInstance.delete<ResponseDeletTopic>(
        `topics/${userId}/${topicId}`
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
