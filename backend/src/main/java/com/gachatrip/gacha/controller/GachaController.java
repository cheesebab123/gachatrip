package com.gachatrip.gacha.controller;

import com.gachatrip.gacha.dto.*;
import com.gachatrip.gacha.service.GachaService;
import com.gachatrip.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/gacha")
@RequiredArgsConstructor
public class GachaController {

    private final GachaService gachaService;

    // 개인 가챠 뽑기
    @PostMapping("/draw")
    public ApiResponse<TicketResponse> drawSolo(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId,
            @RequestBody(required = false) DrawRequest request
    ) {
        TicketResponse response = gachaService.drawSolo(userId, request);
        return ApiResponse.ok(response);
    }

    // 가본 곳 제외 후 재뽑기
    @PostMapping("/redraw")
    public ApiResponse<TicketResponse> redraw(
            @RequestParam Long ticketId,
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId
    ) {
        TicketResponse response = gachaService.excludeAndRedraw(ticketId, userId);
        return ApiResponse.ok(response);
    }

    // 여행지 티켓 최종 확정
    @PostMapping("/confirm/{ticketId}")
    public ApiResponse<TicketResponse> confirmTicket(@PathVariable Long ticketId) {
        TicketResponse response = gachaService.confirmTicket(ticketId);
        return ApiResponse.ok(response, "여행지가 확정되었습니다.");
    }

    // 그룹 가챠방 생성 (6자리 코드 발급)
    @PostMapping("/groups")
    public ApiResponse<GroupRoomResponse> createGroup(@RequestBody CreateGroupRequest request) {
        GroupRoomResponse response = gachaService.createGroup(request);
        return ApiResponse.ok(response, "그룹방이 생성되었습니다.");
    }

    // 초대코드로 그룹 참여
    @PostMapping("/groups/join")
    public ApiResponse<GroupRoomResponse> joinGroup(@RequestBody JoinGroupRequest request) {
        GroupRoomResponse response = gachaService.joinGroup(request);
        return ApiResponse.ok(response, "그룹방에 참여했습니다.");
    }

    // 그룹방 상태 조회
    @GetMapping("/groups/{roomCode}")
    public ApiResponse<GroupRoomResponse> getGroupRoom(@PathVariable String roomCode) {
        GroupRoomResponse response = gachaService.getGroupRoom(roomCode);
        return ApiResponse.ok(response);
    }
}
