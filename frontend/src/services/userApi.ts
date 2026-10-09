import { apiClient, type ApiResponse } from './apiClient';
import type { UserResponse } from './authApi';

export interface UpdateSettingsRequest {
  travelStyle?: string;
  budgetMin?: number;
  budgetMax?: number;
  defaultDeparture?: string;
  notificationEnabled?: boolean;
}

export const userApi = {
  // 내 정보 조회
  getMe: async (userId: number = 1): Promise<UserResponse> => {
    const response = await apiClient.get<ApiResponse<UserResponse>>('/users/me', {
      params: { userId },
    });
    return response.data.data;
  },

  // 사용자 설정 변경 (예산, 출발지, 알림, 여행 스타일 등)
  updateSettings: async (data: UpdateSettingsRequest, userId: number = 1): Promise<UserResponse> => {
    const response = await apiClient.put<ApiResponse<UserResponse>>('/users/settings', data, {
      params: { userId },
    });
    return response.data.data;
  },
};
