import { apiClient, type ApiResponse } from './apiClient';

export interface DestinationItem {
  id: number;
  name: string;
  regionName: string;
  summary: string;
  description?: string;
  imageUrl: string;
  tags?: string[];
  theme?: string;
}

export const destinationApi = {
  // 전체 여행지 목록 조회
  getAll: async (): Promise<DestinationItem[]> => {
    const response = await apiClient.get<ApiResponse<DestinationItem[]>>('/destinations/all');
    return response.data.data;
  },

  // 인기 여행지 TOP 5 조회
  getPopular: async (): Promise<DestinationItem[]> => {
    const response = await apiClient.get<ApiResponse<DestinationItem[]>>('/destinations/popular');
    return response.data.data;
  },

  // 여행지 상세 조회
  getDetail: async (id: number): Promise<DestinationItem> => {
    const response = await apiClient.get<ApiResponse<DestinationItem>>(`/destinations/${id}`);
    return response.data.data;
  },
};
