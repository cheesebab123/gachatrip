package com.gachatrip.home.controller;

import com.gachatrip.destination.dto.response.DestinationListResponse;
import com.gachatrip.destination.service.DestinationService;
import com.gachatrip.global.response.ApiResponse;
import com.gachatrip.home.dto.BannerResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/home")
@RequiredArgsConstructor
public class HomeController {

    private final DestinationService destinationService;

    @GetMapping("/banners")
    public ApiResponse<List<BannerResponse>> getHomeBanners() {
        List<BannerResponse> banners = List.of(
                BannerResponse.builder()
                        .id(1L)
                        .title("어디로 떠날지 고민될 땐?")
                        .subtitle("가챠 머신을 돌려 맞춤 랜덤 여행지를 뽑아보세요!")
                        .badge("GACHA TRIP")
                        .imageUrl("/assets/images/general_뽑기기계_705a60d3.png")
                        .linkUrl("/gacha/setup")
                        .build(),
                BannerResponse.builder()
                        .id(2L)
                        .title("친구들과 함께 뽑는 그룹 가챠")
                        .subtitle("초대 코드로 친구들을 모아 다 같이 떠나요!")
                        .badge("GROUP MODE")
                        .imageUrl("/assets/images/개인 시작_개체_712c54db.png")
                        .linkUrl("/gacha/group/room")
                        .build()
        );
        return ApiResponse.ok(banners);
    }

    @GetMapping("/popular-destinations")
    public ApiResponse<List<DestinationListResponse>> getPopularDestinations() {
        List<DestinationListResponse> destinations = destinationService.getPopularDestinations();
        return ApiResponse.ok(destinations);
    }
}
