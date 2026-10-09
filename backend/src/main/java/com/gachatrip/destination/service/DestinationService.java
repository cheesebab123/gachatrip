package com.gachatrip.destination.service;

import com.gachatrip.destination.domain.Destination;
import com.gachatrip.destination.dto.response.DestinationDetailResponse;
import com.gachatrip.destination.dto.response.DestinationListResponse;
import com.gachatrip.destination.infra.TourApiClient;
import com.gachatrip.destination.repository.DestinationRepository;
import com.gachatrip.global.response.PageResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DestinationService {

    private final DestinationRepository destinationRepository;
    private final TourApiClient tourApiClient;

    @PostConstruct
    @Transactional
    public void initSeedData() {
        if (destinationRepository.count() == 0) {
            log.info("초기 대표 여행지 데이터 시딩 시작...");
            List<Destination> seeds = List.of(
                    Destination.builder()
                            .contentId("126508")
                            .title("경복궁")
                            .region("서울")
                            .address("서울특별시 종로구 사직로 161")
                            .imageUrl("https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80")
                            .capsuleImageUrl("/assets/images/general_가챠 - 경기_1f0d46aa.png")
                            .latitude(37.5796)
                            .longitude(126.9770)
                            .overview("조선 왕조 제일의 법궁으로 웅장한 근정전과 아름다운 경회루가 사계절 내내 아름다운 자태를 뽐냅니다.")
                            .isActive(true)
                            .build(),
                    Destination.builder()
                            .contentId("126509")
                            .title("해운대 해수욕장")
                            .region("부산")
                            .address("부산광역시 해운대구 해운대해변로 264")
                            .imageUrl("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80")
                            .capsuleImageUrl("/assets/images/general_가챠 - 부산_1408011f.png")
                            .latitude(35.1587)
                            .longitude(129.1604)
                            .overview("대한민국 대표 해변으로 끝없이 펼쳐진 백사장과 화려한 도심 야경이 어우러진 해양 관광 명소입니다.")
                            .isActive(true)
                            .build(),
                    Destination.builder()
                            .contentId("126510")
                            .title("성산일출봉")
                            .region("제주")
                            .address("제주특별자치도 서귀포시 성산읍 일출로 284-12")
                            .imageUrl("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80")
                            .capsuleImageUrl("/assets/images/general_가챠 - 제주_0c883e92.png")
                            .latitude(33.4586)
                            .longitude(126.9427)
                            .overview("유네스코 세계자연유산으로 푸른 바다 위에 우뚝 솟은 거대한 화산 분화구와 환상적인 일출을 자랑합니다.")
                            .isActive(true)
                            .build(),
                    Destination.builder()
                            .contentId("126511")
                            .title("강릉 안목해변 커피거리")
                            .region("강원")
                            .address("강원특별자치도 강릉시 창해로 14번길 20-1")
                            .imageUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80")
                            .capsuleImageUrl("/assets/images/general_가챠 - 경기_1f0d46aa.png")
                            .latitude(37.7718)
                            .longitude(128.9482)
                            .overview("동해 바다를 바라보며 향긋한 커피 한 잔의 여유를 즐길 수 있는 대한민국 대표 커피 명소입니다.")
                            .isActive(true)
                            .build(),
                    Destination.builder()
                            .contentId("126512")
                            .title("경주 첨성대 & 황리단길")
                            .region("경북")
                            .address("경상북도 경주시 첨성로 140-25")
                            .imageUrl("https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80")
                            .capsuleImageUrl("/assets/images/general_가챠 - 경주_004cc7ee.png")
                            .latitude(35.8347)
                            .longitude(129.2190)
                            .overview("동양에서 가장 오래된 천문대 첨성대와 한옥 감성 카페가 가득한 핫플레이스 황리단길입니다.")
                            .isActive(true)
                            .build(),
                    Destination.builder()
                            .contentId("126513")
                            .title("여수 밤바다 & 돌산공원")
                            .region("전남")
                            .address("전라남도 여수시 돌산로 3600-1")
                            .imageUrl("https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80")
                            .capsuleImageUrl("/assets/images/general_가챠 - 부산_1408011f.png")
                            .latitude(34.7297)
                            .longitude(127.7408)
                            .overview("낭만적인 야경과 해상 케이블카, 돌산대교의 불빛이 빛나는 대표 로맨틱 여행지입니다.")
                            .isActive(true)
                            .build()
            );

            seeds.forEach(d -> {
                if (d.getRegion().equals("서울")) {
                    d.addTag("궁궐"); d.addTag("역사"); d.addTag("도심투어");
                } else if (d.getRegion().equals("부산")) {
                    d.addTag("바다여행"); d.addTag("야경"); d.addTag("해변산책");
                } else if (d.getRegion().equals("제주")) {
                    d.addTag("자연경관"); d.addTag("일출명소"); d.addTag("힐링");
                } else if (d.getRegion().equals("강원")) {
                    d.addTag("카페투어"); d.addTag("오션뷰"); d.addTag("감성여행");
                } else if (d.getRegion().equals("경북")) {
                    d.addTag("역사체험"); d.addTag("한옥거리"); d.addTag("인생샷");
                } else {
                    d.addTag("로맨틱"); d.addTag("야경"); d.addTag("드라이브");
                }
                destinationRepository.save(d);
            });
            log.info("대표 여행지 {}건 시딩 완료", seeds.size());
        }
    }

    public String getExternalTourData(int numOfRows, int pageNo, String areaCode) {
        return tourApiClient.fetchTourData(numOfRows, pageNo, areaCode);
    }

    public PageResponse<DestinationListResponse> searchDestinations(String region, String keyword, Pageable pageable) {
        Page<Destination> page = destinationRepository.searchDestinations(region, keyword, pageable);
        List<DestinationListResponse> list = page.getContent().stream()
                .map(DestinationListResponse::from)
                .collect(Collectors.toList());

        return PageResponse.<DestinationListResponse>builder()
                .content(list)
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }

    public List<DestinationListResponse> getDestinations() {
        return destinationRepository.findByIsActiveTrue().stream()
                .map(DestinationListResponse::from)
                .collect(Collectors.toList());
    }

    public DestinationDetailResponse getDestinationDetail(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 여행지입니다. ID: " + id));
        return DestinationDetailResponse.from(destination);
    }

    public List<DestinationListResponse> getPopularDestinations() {
        Pageable topFive = PageRequest.of(0, 5);
        return destinationRepository.findByIsActiveTrue().stream()
                .limit(5)
                .map(DestinationListResponse::from)
                .collect(Collectors.toList());
    }
}