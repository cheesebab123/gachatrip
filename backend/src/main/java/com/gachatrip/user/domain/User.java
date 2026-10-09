package com.gachatrip.user.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    private String bio;

    private String avatarUrl;

    @Builder.Default
    private String preferredStyles = "힐링,맛집";

    @Builder.Default
    private String departureRegion = "서울";

    @Builder.Default
    private String defaultBudget = "20만원대";

    @Builder.Default
    private String notificationDays = "금요일,토요일";

    @Builder.Default
    private String notificationTime = "18:00";

    @Builder.Default
    private boolean notificationEnabled = true;

    @Builder.Default
    private boolean dndEnabled = false;

    @Builder.Default
    private boolean locationRecommendationEnabled = true;

    @Builder.Default
    private int recommendationRadius = 150;

    @Builder.Default
    private String language = "ko";

    @Builder.Default
    private boolean linkedKakao = false;

    @Builder.Default
    private boolean linkedGoogle = false;

    @Builder.Default
    private boolean linkedApple = false;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
