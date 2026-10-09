package com.gachatrip.gacha.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JoinGroupRequest {
    private String roomCode;
    private Long userId;
    private String nickname;
    private String avatarUrl;
}
