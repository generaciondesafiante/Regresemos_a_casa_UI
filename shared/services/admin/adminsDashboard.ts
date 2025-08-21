import axiosInstance, { handleAxiosError } from "@/config/axios/instance";
import { AdminPanel } from "@/types/admin/dashboardAdmin";

export const dashboardAdminService = {
  async getDashboardAdmin(id: string): Promise<AdminPanel>  {
    try {
      const response = await axiosInstance.get<AdminPanel>(`/admin/stats/${id}`);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};