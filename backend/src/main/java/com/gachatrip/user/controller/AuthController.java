package com.gachatrip.user.controller;

import com.gachatrip.global.response.ApiResponse;
import com.gachatrip.user.dto.LoginRequest;
import com.gachatrip.user.dto.SignupRequest;
import com.gachatrip.user.dto.UserResponse;
import com.gachatrip.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ApiResponse<UserResponse> signup(@RequestBody SignupRequest request) {
        UserResponse response = authService.signup(request);
        return ApiResponse.ok(response, "회원가입이 완료되었습니다.");
    }

    @PostMapping("/login")
    public ApiResponse<UserResponse> login(@RequestBody LoginRequest request) {
        UserResponse response = authService.login(request);
        return ApiResponse.ok(response, "로그인에 성공했습니다.");
    }
}
