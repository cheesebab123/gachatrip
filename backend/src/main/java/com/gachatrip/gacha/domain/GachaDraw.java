package com.gachatrip.gacha.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "gacha_draws")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GachaDraw {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Column(nullable = false)
    private String destinationName;

    private String regionName;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String hashtags; // 콤마 구분 (#바다여행,#야경,#힐링)

    private String imageUrl;
    private String capsuleImageUrl;
    private String travelTime;
    private String weather;
    private int estimatedBudget;

    @Builder.Default
    private boolean confirmed = false;

    @Builder.Default
    private boolean isGroup = false;

    private String groupRoomCode;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
