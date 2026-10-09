package com.gachatrip.home.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BannerResponse {
    private Long id;
    private String title;
    private String subtitle;
    private String badge;
    private String imageUrl;
    private String linkUrl;
}
