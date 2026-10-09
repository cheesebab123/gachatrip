package com.gachatrip.user.dto;

import com.gachatrip.user.domain.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String nickname;
    private String bio;
    private String avatarUrl;
    private String preferredStyles;
    private String departureRegion;
    private String defaultBudget;
    private String notificationDays;
    private String notificationTime;
    private boolean notificationEnabled;
    private boolean dndEnabled;
    private boolean locationRecommendationEnabled;
    private int recommendationRadius;
    private String language;
    private boolean linkedKakao;
    private boolean linkedGoogle;
    private boolean linkedApple;

    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .bio(user.getBio())
                .avatarUrl(user.getAvatarUrl())
                .preferredStyles(user.getPreferredStyles())
                .departureRegion(user.getDepartureRegion())
                .defaultBudget(user.getDefaultBudget())
                .notificationDays(user.getNotificationDays())
                .notificationTime(user.getNotificationTime())
                .notificationEnabled(user.isNotificationEnabled())
                .dndEnabled(user.isDndEnabled())
                .locationRecommendationEnabled(user.isLocationRecommendationEnabled())
                .recommendationRadius(user.getRecommendationRadius())
                .language(user.getLanguage())
                .linkedKakao(user.isLinkedKakao())
                .linkedGoogle(user.isLinkedGoogle())
                .linkedApple(user.isLinkedApple())
                .build();
    }
}
