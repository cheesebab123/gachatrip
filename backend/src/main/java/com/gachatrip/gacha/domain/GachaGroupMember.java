package com.gachatrip.gacha.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "gacha_group_members")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GachaGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private GachaGroup group;

    private Long userId;

    private String nickname;

    private String avatarUrl;

    @Builder.Default
    private boolean isHost = false;

    @Builder.Default
    private boolean isReady = true;

    @Builder.Default
    private LocalDateTime joinedAt = LocalDateTime.now();
}
