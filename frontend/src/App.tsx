import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SplashPage } from './pages/splash/SplashPage';
import { OnboardingPage } from './pages/onboarding/OnboardingPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/home/HomePage';
import { GachaPage } from './pages/gacha/GachaPage';
import { MyTripPage } from './pages/mytrip/MyTripPage';
import { MyPage } from './pages/my/MyPage';
import { EditProfilePage } from './pages/my/EditProfilePage';
import { ChangeNicknamePage } from './pages/my/ChangeNicknamePage';
import { ChangePasswordPage } from './pages/my/ChangePasswordPage';
import { ConnectedAccountsPage } from './pages/my/ConnectedAccountsPage';
import { DepartureSettingPage } from './pages/my/DepartureSettingPage';
import { TravelStyleSettingPage } from './pages/my/TravelStyleSettingPage';
import { BudgetSettingPage } from './pages/my/BudgetSettingPage';
import { NotificationSettingPage } from './pages/my/NotificationSettingPage';
import { LocationSettingPage } from './pages/my/LocationSettingPage';
import { LanguageSettingPage } from './pages/my/LanguageSettingPage';
import { AppVersionPage } from './pages/my/AppVersionPage';
import { SoloGachaPage } from './pages/gacha/SoloGachaPage';
import { GachaConditionPage } from './pages/gacha/GachaConditionPage';
import { GachaResultPage } from './pages/gacha/GachaResultPage';
import { GachaConfirmedPage } from './pages/gacha/GachaConfirmedPage';
import { GroupRoomCreatePage } from './pages/gacha/GroupRoomCreatePage';
import { GroupDestinationSubmitPage } from './pages/gacha/GroupDestinationSubmitPage';
import { GroupLobbyPage } from './pages/gacha/GroupLobbyPage';
import { GroupMissionIntroPage } from './pages/gacha/GroupMissionIntroPage';
import { GroupMissionPlayPage } from './pages/gacha/GroupMissionPlayPage';
import { GroupMissionResultPage } from './pages/gacha/GroupMissionResultPage';
import { GroupGachaPlayPage } from './pages/gacha/GroupGachaPlayPage';
import { GroupGachaResultPage } from './pages/gacha/GroupGachaResultPage';
import { AuthProvider } from './context/AuthContext';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="w-full min-h-screen bg-[#FAFBFF] sm:bg-[#F0F2F7] flex justify-center sm:items-center sm:py-6">
        <BrowserRouter>
          <Routes>
            {/* 1. 스플래시 화면 */}
            <Route path="/" element={<SplashPage />} />
            
            {/* 2. 온보딩 화면 (1단계 ~ 4단계) */}
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/onboarding/*" element={<Navigate to="/onboarding" replace />} />
            
            {/* 3. 시작하기 / 회원가입 화면 */}
            <Route path="/signup" element={<SignUpPage />} />
            
            {/* 4. 기존 계정 로그인 화면 */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* 5. 비밀번호 찾기 / 재설정 화면 */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* 6. 메인 4대 탭 화면 (공통 상단바 & 하단바 레이아웃 적용) */}
            <Route element={<MainLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/gacha" element={<GachaPage />} />
              <Route path="/mytrip" element={<MyTripPage />} />
              <Route path="/my" element={<MyPage />} />
            </Route>

            {/* 6-1. 뽑기 서브 화면 (개인 뽑기, 조건 설정하기, 뽑기 결과 화면, 그룹방 만들기, 희망 여행지 제출, 그룹 대기실 등) */}
            <Route path="/gacha/solo" element={<SoloGachaPage />} />
            <Route path="/gacha/condition" element={<GachaConditionPage />} />
            <Route path="/gacha/result" element={<GachaResultPage />} />
            <Route path="/gacha/confirmed" element={<GachaConfirmedPage />} />
            <Route path="/gacha/group" element={<GroupRoomCreatePage />} />
            <Route path="/gacha/group/create" element={<GroupRoomCreatePage />} />
            <Route path="/gacha/group/submit" element={<GroupDestinationSubmitPage />} />
            <Route path="/gacha/group/lobby" element={<GroupLobbyPage />} />
            <Route path="/gacha/group/mission" element={<GroupMissionIntroPage />} />
            <Route path="/gacha/group/mission/play" element={<GroupMissionPlayPage />} />
            <Route path="/gacha/group/mission/result" element={<GroupMissionResultPage />} />
            <Route path="/gacha/group/play" element={<GroupGachaPlayPage />} />
            <Route path="/gacha/group/result" element={<GroupGachaResultPage />} />

            {/* 7. 마이페이지 서브 화면 (프로필/계정 설정) */}
            <Route path="/my/profile" element={<EditProfilePage />} />
            <Route path="/my/nickname" element={<ChangeNicknamePage />} />
            <Route path="/my/password" element={<ChangePasswordPage />} />
            <Route path="/my/accounts" element={<ConnectedAccountsPage />} />

            {/* 8. 마이페이지 서브 화면 (여행 설정 & 앱 설정) */}
            <Route path="/my/departure" element={<DepartureSettingPage />} />
            <Route path="/my/style" element={<TravelStyleSettingPage />} />
            <Route path="/my/budget" element={<BudgetSettingPage />} />
            <Route path="/my/notification" element={<NotificationSettingPage />} />
            <Route path="/my/location" element={<LocationSettingPage />} />
            <Route path="/my/language" element={<LanguageSettingPage />} />
            <Route path="/my/version" element={<AppVersionPage />} />
            
            {/* 9. 그 외 경로는 스플래시로 리다이렉트 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
