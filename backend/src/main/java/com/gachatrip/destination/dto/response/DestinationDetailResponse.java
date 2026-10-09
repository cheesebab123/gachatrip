package com.gachatrip.destination.dto.response;

import com.gachatrip.destination.domain.Destination;
import com.gachatrip.destination.domain.DestinationTag;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class DestinationDetailResponse {
    private Long id;
    private String contentId;
    private String title;
    private String region;
    private String address;
    private String imageUrl;
    private String capsuleImageUrl;
    private Double latitude;
    private Double longitude;
    private String overview;
    private List<String> tags;

    public static DestinationDetailResponse from(Destination destination) {
        List<String> tagNames = destination.getTags() != null
                ? destination.getTags().stream()
                    .map(DestinationTag::getTagName)
                    .collect(Collectors.toList())
                : List.of();

        return DestinationDetailResponse.builder()
                .id(destination.getId())
                .contentId(destination.getContentId())
                .title(destination.getTitle())
                .region(destination.getRegion())
                .address(destination.getAddress())
                .imageUrl(destination.getImageUrl())
                .capsuleImageUrl(destination.getCapsuleImageUrl())
                .latitude(destination.getLatitude())
                .longitude(destination.getLongitude())
                .overview(destination.getOverview())
                .tags(tagNames)
                .build();
    }
}