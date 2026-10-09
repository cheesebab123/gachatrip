package com.gachatrip.destination.infra;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Component
public class TourApiClient {

    @Value("${tour.api.key}")
    private String serviceKey;

    // KorService2와 areaBasedList2 경로로 수정
    private final String TOUR_API_BASE_URL = "https://apis.data.go.kr/B551011/KorService2/areaBasedList2";

    public String fetchTourData(int numOfRows, int pageNo, String areaCode) {
        RestTemplate restTemplate = new RestTemplate();

        // .encode()를 제거해서 키가 이중 인코딩되는 것을 방지합니다!
        URI uri = UriComponentsBuilder.fromHttpUrl(TOUR_API_BASE_URL)
                .queryParam("serviceKey", serviceKey)
                .queryParam("numOfRows", numOfRows)
                .queryParam("pageNo", pageNo)
                .queryParam("MobileOS", "ETC")
                .queryParam("MobileApp", "GachaTrip")
                .queryParam("_type", "json")
                .queryParam("areaCode", areaCode)
                .build(true) // true를 주면 인코딩을 수동 제어할 수 있어
                .toUri();

        return restTemplate.getForObject(uri, String.class);
    }
}