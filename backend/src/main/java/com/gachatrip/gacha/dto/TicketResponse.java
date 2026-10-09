package com.gachatrip.gacha.dto;

import com.gachatrip.gacha.domain.GachaDraw;
import lombok.Builder;
import lombok.Getter;

import java.util.Arrays;
import java.util.List;

@Getter
@Builder
public class TicketResponse {
    private Long id;
    private String name;
    private String regionName;
    private String summary;
    private String description;
    private List<String> hashtags;
    private String imageUrl;
    private String capsuleImageUrl;
    private String travelTime;
    private String weather;
    private int estimatedBudget;
    private boolean confirmed;
    private boolean isGroup;
    private String groupRoomCode;

    public static TicketResponse from(GachaDraw draw) {
        List<String> tags = draw.getHashtags() != null && !draw.getHashtags().isBlank()
                ? Arrays.asList(draw.getHashtags().split(","))
                : List.of("#랜덤여행", "#가챠트립");

        return TicketResponse.builder()
                .id(draw.getId())
                .name(draw.getDestinationName())
                .regionName(draw.getRegionName())
                .summary(draw.getSummary())
                .description(draw.getDescription())
                .hashtags(tags)
                .imageUrl(draw.getImageUrl())
                .capsuleImageUrl(draw.getCapsuleImageUrl())
                .travelTime(draw.getTravelTime())
                .weather(draw.getWeather())
                .estimatedBudget(draw.getEstimatedBudget())
                .confirmed(draw.isConfirmed())
                .isGroup(draw.isGroup())
                .groupRoomCode(draw.getGroupRoomCode())
                .build();
    }
}
