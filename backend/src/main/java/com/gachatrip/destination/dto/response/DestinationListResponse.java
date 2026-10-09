package com.gachatrip.destination.dto.response;

import com.gachatrip.destination.domain.Destination;
import com.gachatrip.destination.domain.DestinationTag;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class DestinationListResponse {
    private Long id;
    private String title;
    private String region;
    private String address;
    private String imageUrl;
    private String capsuleImageUrl;
    private List<String> tags;

    public static DestinationListResponse from(Destination destination) {
        List<String> tagList = destination.getTags() != null
                ? destination.getTags().stream().map(DestinationTag::getTagName).collect(Collectors.toList())
                : List.of();

        return DestinationListResponse.builder()
                .id(destination.getId())
                .title(destination.getTitle())
                .region(destination.getRegion())
                .address(destination.getAddress())
                .imageUrl(destination.getImageUrl())
                .capsuleImageUrl(destination.getCapsuleImageUrl())
                .tags(tagList)
                .build();
    }
}