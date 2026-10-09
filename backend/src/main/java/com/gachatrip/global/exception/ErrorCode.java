package com.gachatrip.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // ── Auth ──
    EMAIL_DUPLICATE(HttpStatus.CONFLICT, "AUTH_001", "이미 사용 중인 이메일입니다."),
    NICKNAME_DUPLICATE(HttpStatus.CONFLICT, "AUTH_002", "이미 사용 중인 닉네임입니다."),
    NICKNAME_CHANGE_TOO_SOON(HttpStatus.CONFLICT, "AUTH_003", "닉네임은 30일에 1번만 변경할 수 있습니다."),
    NICKNAME_INVALID_FORMAT(HttpStatus.BAD_REQUEST, "AUTH_004", "닉네임은 2~10자의 한글, 영문, 숫자만 사용 가능합니다."),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "AUTH_005", "현재 비밀번호가 일치하지 않습니다."),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "AUTH_006", "액세스 토큰이 만료되었습니다."),
    TOKEN_INVALID(HttpStatus.UNAUTHORIZED, "AUTH_007", "유효하지 않은 토큰입니다."),
    REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "AUTH_008", "리프레시 토큰이 만료되었습니다. 다시 로그인해주세요."),

    // ── User ──
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USER_001", "사용자를 찾을 수 없습니다."),

    // ── Destination ──
    DESTINATION_NOT_FOUND(HttpStatus.NOT_FOUND, "DEST_001", "여행지를 찾을 수 없습니다."),
    DESTINATION_INACTIVE(HttpStatus.BAD_REQUEST, "DEST_002", "비활성화된 여행지입니다."),

    // ── Gacha ──
    GACHA_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "GACHA_001", "가챠 방을 찾을 수 없습니다."),
    GACHA_ROOM_FULL(HttpStatus.CONFLICT, "GACHA_002", "방 정원이 초과되었습니다."),
    GACHA_ROOM_CLOSED(HttpStatus.CONFLICT, "GACHA_003", "이미 종료된 방입니다."),
    GACHA_ROOM_NOT_HOST(HttpStatus.FORBIDDEN, "GACHA_004", "방장만 실행할 수 있습니다."),
    GACHA_RESULT_NOT_FOUND(HttpStatus.NOT_FOUND, "GACHA_005", "뽑기 결과를 찾을 수 없습니다."),
    GACHA_ALREADY_CONFIRMED(HttpStatus.CONFLICT, "GACHA_006", "이미 확정된 뽑기 결과입니다."),

    // ── Curation ──
    CURATION_NOT_FOUND(HttpStatus.NOT_FOUND, "CUR_001", "큐레이션을 찾을 수 없습니다."),
    CURATION_STILL_GENERATING(HttpStatus.CONFLICT, "CUR_002", "AI 큐레이션 생성 중입니다."),

    // ── MyTrip ──
    TRAVEL_RECORD_NOT_FOUND(HttpStatus.NOT_FOUND, "TRIP_001", "여행 기록을 찾을 수 없습니다."),
    TRAVEL_RECORD_FORBIDDEN(HttpStatus.FORBIDDEN, "TRIP_002", "본인의 여행 기록만 수정/삭제할 수 있습니다."),

    // ── Admin ──
    POLICY_WEIGHT_INVALID(HttpStatus.BAD_REQUEST, "ADM_001", "가중치 합계는 반드시 100%(1.0)여야 합니다."),
    ADMIN_ONLY(HttpStatus.FORBIDDEN, "ADM_002", "관리자만 접근할 수 있습니다."),

    // ── Support ──
    INQUIRY_NOT_FOUND(HttpStatus.NOT_FOUND, "SUP_001", "문의를 찾을 수 없습니다."),
    REPORT_DUPLICATE(HttpStatus.CONFLICT, "SUP_002", "이미 신고한 사용자입니다."),

    // ── File ──
    FILE_TOO_LARGE(HttpStatus.BAD_REQUEST, "FILE_001", "파일 크기가 너무 큽니다."),
    FILE_INVALID_TYPE(HttpStatus.BAD_REQUEST, "FILE_002", "지원하지 않는 파일 형식입니다."),

    // ── Common ──
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "COMMON_001", "요청 파라미터가 올바르지 않습니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "COMMON_500", "서버 내부 오류가 발생했습니다.");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
