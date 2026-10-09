package com.gachatrip.user.controller;

import com.gachatrip.global.response.ApiResponse;
import com.gachatrip.user.dto.UpdateSettingsRequest;
import com.gachatrip.user.dto.UserResponse;
import com.gachatrip.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;

    @GetMapping("/me")
    public ApiResponse<UserResponse> getMyProfile(
            @RequestParam(required = false, defaultValue = "1") Long userId
    ) {
        UserResponse response = authService.getUser(userId);
        return ApiResponse.ok(response);
    }

    @PutMapping("/settings")
    public ApiResponse<UserResponse> updateSettings(
            @RequestParam(required = false, defaultValue = "1") Long userId,
            @RequestBody UpdateSettingsRequest request
    ) {
        UserResponse response = authService.updateSettings(userId, request);
        return ApiResponse.ok(response, "사용자 설정이 변경되었습니다.");
    }
}
