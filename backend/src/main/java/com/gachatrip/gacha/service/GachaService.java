package com.gachatrip.gacha.service;

import com.gachatrip.destination.domain.Destination;
import com.gachatrip.destination.repository.DestinationRepository;
import com.gachatrip.gacha.domain.GachaDraw;
import com.gachatrip.gacha.domain.GachaGroup;
import com.gachatrip.gacha.domain.GachaGroupMember;
import com.gachatrip.gacha.dto.*;
import com.gachatrip.gacha.repository.GachaDrawRepository;
import com.gachatrip.gacha.repository.GachaGroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class GachaService {

    private final GachaDrawRepository drawRepository;
    private final GachaGroupRepository groupRepository;
    private final DestinationRepository destinationRepository;

    private final Random random = new Random();
    private static final String CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    // 1. 개인 가챠 뽑기
    public TicketResponse drawSolo(Long userId, DrawRequest req) {
        List<Destination> allActive = destinationRepository.findByIsActiveTrue();
        
        // 제외 지역 필터링
        List<String> excludes = req != null && req.getExcludeConditions() != null 
                ? req.getExcludeConditions() 
                : List.of();

        List<Destination> candidates = new ArrayList<>();
        for (Destination d : allActive) {
            boolean isExcluded = excludes.stream().anyMatch(ex -> d.getTitle().contains(ex) || d.getRegion().contains(ex));
            if (!isExcluded) {
                candidates.add(d);
            }
        }

        if (candidates.isEmpty()) {
            candidates = allActive; // 전체 대상 폴백
        }

        // 선호 지역이 있는 경우 우선 매칭
        Destination selected = null;
        if (req != null && req.getPreferredRegions() != null && !req.getPreferredRegions().isEmpty()) {
            for (String pref : req.getPreferredRegions()) {
                Optional<Destination> matched = candidates.stream()
                        .filter(c -> c.getRegion().contains(pref) || pref.contains(c.getRegion()))
                        .findAny();
                if (matched.isPresent()) {
                    selected = matched.get();
                    break;
                }
            }
        }

        if (selected == null && !candidates.isEmpty()) {
            selected = candidates.get(random.nextInt(candidates.size()));
        }

        // Fallback default
        if (selected == null) {
            selected = Destination.builder()
                    .title("강릉 안목해변 커피거리")
                    .region("강원")
                    .address("강원특별자치도 강릉시 창해로 14번길 20-1")
                    .imageUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80")
                    .capsuleImageUrl("/assets/images/general_가챠 - 경기_1f0d46aa.png")
                    .overview("시원한 동해 바다와 향긋한 커피가 함께하는 낭만적인 여행지입니다.")
                    .build();
        }

        // 여행 메타정보 계산
        String travelTime = calculateTravelTime(selected.getRegion());
        String weather = "맑음 " + (20 + random.nextInt(6)) + "°";
        int budget = calculateBudget(req != null ? req.getBudget() : null, selected.getRegion());
        String hashtags = generateHashtags(selected, req != null ? req.getStyle() : null);

        GachaDraw draw = GachaDraw.builder()
                .userId(userId)
                .destinationName(selected.getTitle())
                .regionName(selected.getRegion() != null ? selected.getRegion() : "대한민국")
                .summary(selected.getOverview() != null && selected.getOverview().length() > 50 
                        ? selected.getOverview().substring(0, 50) + "..." 
                        : selected.getOverview())
                .description(selected.getOverview())
                .hashtags(hashtags)
                .imageUrl(selected.getImageUrl())
                .capsuleImageUrl(selected.getCapsuleImageUrl())
                .travelTime(travelTime)
                .weather(weather)
                .estimatedBudget(budget)
                .confirmed(false)
                .isGroup(false)
                .createdAt(LocalDateTime.now())
                .build();

        GachaDraw saved = drawRepository.save(draw);
        return TicketResponse.from(saved);
    }

    // 2. 가본 곳 제외 후 재뽑기
    public TicketResponse excludeAndRedraw(Long ticketId, Long userId) {
        GachaDraw oldDraw = drawRepository.findById(ticketId).orElse(null);
        String oldRegion = oldDraw != null ? oldDraw.getRegionName() : "";
        String oldName = oldDraw != null ? oldDraw.getDestinationName() : "";

        DrawRequest redrawReq = DrawRequest.builder()
                .excludeConditions(List.of(oldRegion, oldName))
                .build();

        return drawSolo(userId, redrawReq);
    }

    // 3. 여행지 최종 확정
    public TicketResponse confirmTicket(Long ticketId) {
        GachaDraw draw = drawRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 가챠 티켓입니다. ID: " + ticketId));
        draw.setConfirmed(true);
        return TicketResponse.from(draw);
    }

    // 4. 그룹 가챠방 생성 (6자리 초대코드)
    public GroupRoomResponse createGroup(CreateGroupRequest req) {
        String code = generateUniqueRoomCode();

        GachaGroup group = GachaGroup.builder()
                .roomCode(code)
                .title(req.getTitle() != null ? req.getTitle() : "함께 떠나는 가챠 트립")
                .hostUserId(req.getHostUserId() != null ? req.getHostUserId() : 1L)
                .status(GachaGroup.RoomStatus.WAITING)
                .build();

        GachaGroupMember hostMember = GachaGroupMember.builder()
                .userId(req.getHostUserId() != null ? req.getHostUserId() : 1L)
                .nickname(req.getHostNickname() != null ? req.getHostNickname() : "방장")
                .avatarUrl(req.getHostAvatarUrl())
                .isHost(true)
                .isReady(true)
                .build();

        group.addMember(hostMember);
        GachaGroup saved = groupRepository.save(group);
        return GroupRoomResponse.from(saved);
    }

    // 5. 그룹 참여
    public GroupRoomResponse joinGroup(JoinGroupRequest req) {
        GachaGroup group = groupRepository.findByRoomCode(req.getRoomCode().toUpperCase())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않거나 만료된 초대 코드입니다: " + req.getRoomCode()));

        boolean alreadyJoined = group.getMembers().stream()
                .anyMatch(m -> Objects.equals(m.getUserId(), req.getUserId()));

        if (!alreadyJoined) {
            GachaGroupMember member = GachaGroupMember.builder()
                    .userId(req.getUserId() != null ? req.getUserId() : (long) (group.getMembers().size() + 1))
                    .nickname(req.getNickname() != null ? req.getNickname() : "여행자 " + (group.getMembers().size() + 1))
                    .avatarUrl(req.getAvatarUrl())
                    .isHost(false)
                    .isReady(true)
                    .build();
            group.addMember(member);
        }

        return GroupRoomResponse.from(group);
    }

    // 6. 그룹방 상태 조회
    @Transactional(readOnly = true)
    public GroupRoomResponse getGroupRoom(String roomCode) {
        GachaGroup group = groupRepository.findByRoomCode(roomCode.toUpperCase())
                .orElseThrow(() -> new IllegalArgumentException("방을 찾을 수 없습니다: " + roomCode));
        return GroupRoomResponse.from(group);
    }

    // 헬퍼: 6자리 랜덤 초대코드 생성
    private String generateUniqueRoomCode() {
        for (int i = 0; i < 10; i++) {
            StringBuilder sb = new StringBuilder();
            sb.append("GT");
            for (int j = 0; j < 4; j++) {
                sb.append(CODE_CHARS.charAt(SECURE_RANDOM.nextInt(CODE_CHARS.length())));
            }
            String code = sb.toString();
            if (groupRepository.findByRoomCode(code).isEmpty()) {
                return code;
            }
        }
        return "GT" + (1000 + random.nextInt(9000));
    }

    private String calculateTravelTime(String region) {
        if (region == null) return "KTX 2시간";
        if (region.contains("서울") || region.contains("경기")) return "지하철/버스 40분";
        if (region.contains("강원")) return "KTX 1시간 40분";
        if (region.contains("제주")) return "비행기 1시간 10분";
        if (region.contains("부산")) return "KTX 2시간 30분";
        if (region.contains("경북") || region.contains("경남")) return "KTX 2시간 10분";
        if (region.contains("전남") || region.contains("전북")) return "KTX 1시간 50분";
        return "KTX 2시간";
    }

    private int calculateBudget(String budgetStr, String region) {
        if (region != null && region.contains("제주")) return 280000;
        if (budgetStr != null && budgetStr.contains("10")) return 120000;
        if (budgetStr != null && budgetStr.contains("30")) return 320000;
        return 190000 + random.nextInt(5) * 10000;
    }

    private String generateHashtags(Destination destination, String style) {
        List<String> tags = new ArrayList<>();
        if (destination.getTags() != null && !destination.getTags().isEmpty()) {
            destination.getTags().forEach(t -> tags.add("#" + t.getTagName()));
        }
        if (style != null && !style.isBlank()) {
            tags.add("#" + style);
        }
        if (tags.isEmpty()) {
            tags.addAll(List.of("#바다여행", "#로컬맛집", "#힐링", "#감성충전"));
        }
        return String.join(",", tags.subList(0, Math.min(4, tags.size())));
    }
}
