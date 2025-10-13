import axiosInstance from "@/config/axios/instance";
import { ResourceResponseTable } from "@/types/admin/resources/resourcesTable-type";
import { Params } from "@/types/tables/params";

export const ResourcesAdminTables = {
  async fetchResources(
    userId: string,
    params: Params
  ): Promise<ResourceResponseTable> {
    try {
      const response = await axiosInstance.get<ResourceResponseTable>(
        `/resources/${userId}`,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
