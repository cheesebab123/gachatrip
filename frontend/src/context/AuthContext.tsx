import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile } from '../types/user';
import { DEFAULT_MOCK_USER } from '../mocks/mockUser';
import { authApi } from '../services/authApi';
import { userApi } from '../services/userApi';

interface AuthContextType {
  user: UserProfile;
  isLoggedIn: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (email: string, password: string, nickname: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedFields: Partial<UserProfile>) => void;
  updateTravelSettings: (settings: Partial<UserProfile['travelSettings']>) => Promise<void>;
  updateAppSettings: (settings: Partial<UserProfile['appSettings']>) => void;
}

const STORAGE_KEY = 'gachatrip_user_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('사용자 세션 로드 실패:', e);
    }
    return DEFAULT_MOCK_USER;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) !== null;
  });

  // 세션 변경 시 localStorage 동기화
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user, isLoggedIn]);

  const login = async (email: string, password?: string): Promise<boolean> => {
    try {
      // 1. Spring Boot 백엔드 REST API 로그인 시도
      const res = await authApi.login({ email, password });
      if (res) {
        const loggedUser: UserProfile = {
          ...DEFAULT_MOCK_USER,
          id: String(res.id),
          email: res.email,
          name: res.nickname,
          avatarUrl: res.profileImageUrl || DEFAULT_MOCK_USER.avatarUrl,
        };
        setUser(loggedUser);
        setIsLoggedIn(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
        return true;
      }
    } catch (err) {
      console.warn('Backend login failed, falling back to local session:', err);
    }

    // 2. 오프라인 / 목업 Fallback
    const loggedUser: UserProfile = {
      ...DEFAULT_MOCK_USER,
      email: email.trim() || DEFAULT_MOCK_USER.email,
    };
    setUser(loggedUser);
    setIsLoggedIn(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
    return true;
  };

  const signup = async (email: string, password: string, nickname: string): Promise<boolean> => {
    try {
      const res = await authApi.signup({ email, password, nickname });
      if (res) {
        const newUser: UserProfile = {
          ...DEFAULT_MOCK_USER,
          id: String(res.id),
          email: res.email,
          name: res.nickname,
        };
        setUser(newUser);
        setIsLoggedIn(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        return true;
      }
    } catch (err) {
      console.warn('Backend signup failed, falling back to local session:', err);
    }

    const newUser: UserProfile = {
      ...DEFAULT_MOCK_USER,
      email: email.trim(),
      name: nickname.trim() || '여행자',
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(STORAGE_KEY);
    setUser(DEFAULT_MOCK_USER);
  };

  const updateUser = (updatedFields: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const updateTravelSettings = async (settings: Partial<UserProfile['travelSettings']>) => {
    setUser((prev) => ({
      ...prev,
      travelSettings: {
        ...prev.travelSettings,
        ...settings,
      },
    }));

    try {
      const userIdNum = parseInt(user.id, 10) || 1;
      await userApi.updateSettings({
        travelStyle: settings.travelStyle,
        defaultDeparture: settings.departureLocation,
      }, userIdNum);
    } catch (err) {
      console.warn('Backend settings update failed:', err);
    }
  };

  const updateAppSettings = (settings: Partial<UserProfile['appSettings']>) => {
    setUser((prev) => ({
      ...prev,
      appSettings: {
        ...prev.appSettings,
        ...settings,
      },
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        signup,
        logout,
        updateUser,
        updateTravelSettings,
        updateAppSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
