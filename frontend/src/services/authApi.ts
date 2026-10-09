import { apiClient, type ApiResponse } from './apiClient';

export interface SignupRequest {
  email: string;
  password?: string;
  nickname: string;
  loginType?: 'EMAIL' | 'KAKAO' | 'GOOGLE';
  marketingConsent?: boolean;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  loginType: string;
  travelStyle?: string;
  budgetMin?: number;
  budgetMax?: number;
  defaultDeparture?: string;
  notificationEnabled?: boolean;
  marketingConsent?: boolean;
  createdAt?: string;
}

export const authApi = {
  // 회원가입
  signup: async (data: SignupRequest): Promise<UserResponse> => {
    const response = await apiClient.post<ApiResponse<UserResponse>>('/auth/signup', data);
    return response.data.data;
  },

  // 로그인
  login: async (data: LoginRequest): Promise<UserResponse> => {
    const response = await apiClient.post<ApiResponse<UserResponse>>('/auth/login', data);
    return response.data.data;
  },
};
