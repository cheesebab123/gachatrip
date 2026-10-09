package com.gachatrip.gacha.dto;

import com.gachatrip.gacha.domain.GachaGroup;
import com.gachatrip.gacha.domain.GachaGroupMember;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class GroupRoomResponse {
    private Long roomId;
    private String roomCode;
    private String title;
    private Long hostUserId;
    private String status;
    private List<MemberDto> members;

    @Getter
    @Builder
    public static class MemberDto {
        private Long userId;
        private String nickname;
        private String avatarUrl;
        private boolean isHost;
        private boolean isReady;
    }

    public static GroupRoomResponse from(GachaGroup group) {
        List<MemberDto> memberDtos = group.getMembers().stream()
                .map(m -> MemberDto.builder()
                        .userId(m.getUserId())
                        .nickname(m.getNickname())
                        .avatarUrl(m.getAvatarUrl())
                        .isHost(m.isHost())
                        .isReady(m.isReady())
                        .build())
                .collect(Collectors.toList());

        return GroupRoomResponse.builder()
                .roomId(group.getId())
                .roomCode(group.getRoomCode())
                .title(group.getTitle())
                .hostUserId(group.getHostUserId())
                .status(group.getStatus().name())
                .members(memberDtos)
                .build();
    }
}
