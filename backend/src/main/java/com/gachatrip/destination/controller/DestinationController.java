package com.gachatrip.destination.controller;

import com.gachatrip.destination.dto.response.DestinationDetailResponse;
import com.gachatrip.destination.dto.response.DestinationListResponse;
import com.gachatrip.destination.service.DestinationService;
import com.gachatrip.global.response.ApiResponse;
import com.gachatrip.global.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/destinations")
@RequiredArgsConstructor
public class DestinationController {

    private final DestinationService destinationService;

    // 여행지 목록 및 검색 (지역/키워드/페이징)
    @GetMapping
    public ApiResponse<PageResponse<DestinationListResponse>> searchDestinations(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String keyword,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        PageResponse<DestinationListResponse> response = destinationService.searchDestinations(region, keyword, pageable);
        return ApiResponse.ok(response);
    }

    // 전체 활성 여행지 단순 목록
    @GetMapping("/all")
    public ApiResponse<List<DestinationListResponse>> getAllDestinations() {
        List<DestinationListResponse> response = destinationService.getDestinations();
        return ApiResponse.ok(response);
    }

    // 인기 여행지 TOP 5
    @GetMapping("/popular")
    public ApiResponse<List<DestinationListResponse>> getPopularDestinations() {
        List<DestinationListResponse> response = destinationService.getPopularDestinations();
        return ApiResponse.ok(response);
    }

    // 여행지 상세 단건 조회
    @GetMapping("/{id}")
    public ApiResponse<DestinationDetailResponse> getDestinationDetail(@PathVariable Long id) {
        DestinationDetailResponse response = destinationService.getDestinationDetail(id);
        return ApiResponse.ok(response);
    }

    // Tour API 원본 데이터 연동 검증용 (검증된 로직 유지)
    @GetMapping("/external")
    public ApiResponse<String> getExternalDestinations(
            @RequestParam(defaultValue = "10") int numOfRows,
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(required = false) String areaCode
    ) {
        String response = destinationService.getExternalTourData(numOfRows, pageNo, areaCode);
        return ApiResponse.ok(response);
    }
}