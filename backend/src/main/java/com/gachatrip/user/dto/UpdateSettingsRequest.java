package com.gachatrip.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSettingsRequest {
    private String nickname;
    private String bio;
    private String avatarUrl;
    private String preferredStyles;
    private String departureRegion;
    private String defaultBudget;
    private String notificationDays;
    private String notificationTime;
    private Boolean notificationEnabled;
    private Boolean dndEnabled;
    private Boolean locationRecommendationEnabled;
    private Integer recommendationRadius;
    private String language;
}
