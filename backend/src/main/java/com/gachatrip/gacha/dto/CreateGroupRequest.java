package com.gachatrip.gacha.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateGroupRequest {
    private String title;
    private Long hostUserId;
    private String hostNickname;
    private String hostAvatarUrl;
}
