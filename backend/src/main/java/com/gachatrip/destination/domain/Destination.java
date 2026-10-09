package com.gachatrip.destination.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "destinations")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String contentId; // 한국관광공사 contentId

    @Column(nullable = false)
    private String title;     // 여행지 이름

    private String region;    // 지역명 (서울, 부산, 제주, 강원 등)
    private String address;   // 주소
    private String imageUrl;  // 이미지 썸네일
    private String capsuleImageUrl; // 가챠 캡슐/배경 이미지

    private Double latitude;
    private Double longitude;

    @Builder.Default
    private boolean isActive = true;
    
    @Column(columnDefinition = "TEXT")
    private String overview;  // 상세 개요

    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<DestinationTag> tags = new ArrayList<>();

    public void addTag(String tagName) {
        if (this.tags == null) {
            this.tags = new ArrayList<>();
        }
        this.tags.add(DestinationTag.builder()
                .destination(this)
                .tagName(tagName)
                .build());
    }
}