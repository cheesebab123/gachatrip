import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

// 기본 API 인스턴스 (Vite 프록시를 통해 /api/v1 으로 전달)
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 로컬 스토리지의 토큰 및 userId 헤더 자동 첨부
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('gachatrip_token');
    const userStr = localStorage.getItem('gachatrip_user_session');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.id) {
          config.headers['X-User-Id'] = String(user.id);
        }
      } catch (e) {
        console.error('Failed to parse user for X-User-Id header', e);
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 공통 에러 핸들링
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('Session expired or unauthorized request.');
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message?: string;
  data: T;
}
