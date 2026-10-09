package com.gachatrip.user.service;

import com.gachatrip.user.domain.User;
import com.gachatrip.user.dto.LoginRequest;
import com.gachatrip.user.dto.SignupRequest;
import com.gachatrip.user.dto.UpdateSettingsRequest;
import com.gachatrip.user.dto.UserResponse;
import com.gachatrip.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse signup(SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일 주소입니다.");
        }

        String encodedPassword = passwordEncoder.encode(req.getPassword());

        User user = User.builder()
                .email(req.getEmail())
                .password(encodedPassword)
                .nickname(req.getNickname() != null && !req.getNickname().isBlank() ? req.getNickname() : "가챠여행자")
                .bio("랜덤 여행을 사랑하는 여행자")
                .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80")
                .build();

        User saved = userRepository.save(user);
        return UserResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public UserResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자 계정입니다."));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return UserResponse.from(user);
    }

    public UserResponse updateSettings(Long userId, UpdateSettingsRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다. ID: " + userId));

        if (req.getNickname() != null) user.setNickname(req.getNickname());
        if (req.getBio() != null) user.setBio(req.getBio());
        if (req.getAvatarUrl() != null) user.setAvatarUrl(req.getAvatarUrl());
        if (req.getPreferredStyles() != null) user.setPreferredStyles(req.getPreferredStyles());
        if (req.getDepartureRegion() != null) user.setDepartureRegion(req.getDepartureRegion());
        if (req.getDefaultBudget() != null) user.setDefaultBudget(req.getDefaultBudget());
        if (req.getNotificationDays() != null) user.setNotificationDays(req.getNotificationDays());
        if (req.getNotificationTime() != null) user.setNotificationTime(req.getNotificationTime());
        if (req.getNotificationEnabled() != null) user.setNotificationEnabled(req.getNotificationEnabled());
        if (req.getDndEnabled() != null) user.setDndEnabled(req.getDndEnabled());
        if (req.getLocationRecommendationEnabled() != null) user.setLocationRecommendationEnabled(req.getLocationRecommendationEnabled());
        if (req.getRecommendationRadius() != null) user.setRecommendationRadius(req.getRecommendationRadius());
        if (req.getLanguage() != null) user.setLanguage(req.getLanguage());

        return UserResponse.from(user);
    }

    @Transactional(readOnly = true)
    public UserResponse getUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return UserResponse.from(user);
    }
}
