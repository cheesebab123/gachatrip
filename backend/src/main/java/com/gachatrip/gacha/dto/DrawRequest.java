package com.gachatrip.gacha.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DrawRequest {
    private String style;                 // 힐링, 맛집, 액티비티, 감성 등
    private String date;                  // 당일치기, 1박2일, 2박3일 등
    private String budget;                // 10만원 이하, 20만원대, 30만원 이상 등
    private Integer distance;             // 최대 이동 거리 (km)
    private List<String> preferredRegions;// 선호 지역 리스트
    private String companion;             // 혼자, 연인과, 친구와, 가족과
    private Integer memberCount;          // 인원 수
    private List<String> excludeConditions;// 제외하고 싶은 지역/조건
}
