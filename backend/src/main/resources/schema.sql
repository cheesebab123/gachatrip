-- ==========================================================
-- 가챠트립 (GachaTrip) 20개 완성형 엔티티 스키마 (H2 / MySQL 호환)
-- ==========================================================

SET REFERENTIAL_INTEGRITY FALSE;

-- 1. USER (회원)
CREATE TABLE IF NOT EXISTS users (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    email               VARCHAR(255) NOT NULL UNIQUE,
    password_hash       VARCHAR(255) NULL,
    nickname            VARCHAR(30)  NOT NULL UNIQUE,
    nickname_changed_at DATE NULL,
    profile_image_url   VARCHAR(500) NULL,
    bio                 VARCHAR(255) NULL,
    auth_provider       VARCHAR(20)  NOT NULL DEFAULT 'LOCAL',
    provider_id         VARCHAR(255) NULL,
    language            VARCHAR(10)  NOT NULL DEFAULT 'ko',
    is_active           BOOLEAN      NOT NULL DEFAULT TRUE,
    role                VARCHAR(20)  NOT NULL DEFAULT 'ROLE_USER',
    created_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. USER_PREFERENCE (회원 여행 설정)
CREATE TABLE IF NOT EXISTS user_preferences (
    id                          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id                     BIGINT NOT NULL UNIQUE,
    departure_region            VARCHAR(50) NULL,
    budget_min                  INT NOT NULL DEFAULT 0,
    budget_max                  INT NOT NULL DEFAULT 500000,
    recommend_alert             BOOLEAN NOT NULL DEFAULT TRUE,
    location_based_recommend    BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at                  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pref_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- 3. USER_TRAVEL_STYLE (회원 관심 여행 스타일)
CREATE TABLE IF NOT EXISTS user_travel_styles (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    style       VARCHAR(30) NOT NULL,
    CONSTRAINT fk_style_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- 4. DESTINATION (여행지)
CREATE TABLE IF NOT EXISTS destinations (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    content_id          VARCHAR(50) NOT NULL,
    title               VARCHAR(100) NOT NULL,
    region              VARCHAR(50)  NULL,
    address             VARCHAR(255) NULL,
    image_url           VARCHAR(500) NULL,
    capsule_image_url   VARCHAR(500) NULL,
    latitude            DOUBLE NULL,
    longitude           DOUBLE NULL,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    overview            TEXT NULL,
    created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. DESTINATION_TAG (여행지 해시태그)
CREATE TABLE IF NOT EXISTS destination_tags (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    destination_id  BIGINT NOT NULL,
    tag_name        VARCHAR(50) NOT NULL,
    CONSTRAINT fk_tag_dest FOREIGN KEY (destination_id) REFERENCES destinations (id) ON DELETE CASCADE
);

-- 6. GACHA_ROOM (가챠 뽑기 방 - 개인/그룹 공용)
CREATE TABLE IF NOT EXISTS gacha_rooms (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    host_user_id    BIGINT NOT NULL,
    room_code       VARCHAR(10) NULL UNIQUE,
    mode            VARCHAR(20) NOT NULL DEFAULT 'SOLO',
    status          VARCHAR(20) NOT NULL DEFAULT 'WAITING',
    step            VARCHAR(30) NOT NULL DEFAULT '대기실',
    max_members     INT NOT NULL DEFAULT 1,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    closed_at       TIMESTAMP NULL,
    CONSTRAINT fk_room_host FOREIGN KEY (host_user_id) REFERENCES users (id)
);

-- 7. GACHA_ROOM_MEMBER (그룹 방 참여 멤버)
CREATE TABLE IF NOT EXISTS gacha_room_members (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id     BIGINT NOT NULL,
    user_id     BIGINT NOT NULL,
    is_host     BOOLEAN NOT NULL DEFAULT FALSE,
    status      VARCHAR(20) NOT NULL DEFAULT 'ONLINE',
    joined_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mem_room FOREIGN KEY (room_id) REFERENCES gacha_rooms (id) ON DELETE CASCADE,
    CONSTRAINT fk_mem_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- 8. GACHA_CONDITION (뽑기 조건)
CREATE TABLE IF NOT EXISTS gacha_conditions (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id             BIGINT NOT NULL,
    user_id             BIGINT NOT NULL,
    travel_style        VARCHAR(50) NOT NULL,
    departure_region    VARCHAR(50) NOT NULL,
    budget_min          INT NOT NULL DEFAULT 0,
    budget_max          INT NOT NULL DEFAULT 500000,
    duration            VARCHAR(30) NOT NULL,
    desired_destination VARCHAR(100) NULL,
    created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cond_room FOREIGN KEY (room_id) REFERENCES gacha_rooms (id) ON DELETE CASCADE,
    CONSTRAINT fk_cond_user FOREIGN KEY (user_id) REFERENCES users (id)
);

-- 9. GACHA_RESULT (뽑기 결과)
CREATE TABLE IF NOT EXISTS gacha_results (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id         BIGINT NOT NULL,
    destination_id  BIGINT NOT NULL,
    result_type     VARCHAR(20) NOT NULL DEFAULT 'SOLO',
    is_confirmed    BOOLEAN NOT NULL DEFAULT FALSE,
    drawn_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    confirmed_at    TIMESTAMP NULL,
    CONSTRAINT fk_res_room FOREIGN KEY (room_id) REFERENCES gacha_rooms (id) ON DELETE CASCADE,
    CONSTRAINT fk_res_dest FOREIGN KEY (destination_id) REFERENCES destinations (id)
);

-- 10. GROUP_VOTE (그룹 뽑기 투표)
CREATE TABLE IF NOT EXISTS group_votes (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id         BIGINT NOT NULL,
    destination_id  BIGINT NOT NULL,
    voter_user_id   BIGINT NOT NULL,
    is_agreed       BOOLEAN NOT NULL DEFAULT TRUE,
    voted_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vote_room FOREIGN KEY (room_id) REFERENCES gacha_rooms (id) ON DELETE CASCADE,
    CONSTRAINT fk_vote_dest FOREIGN KEY (destination_id) REFERENCES destinations (id),
    CONSTRAINT fk_vote_user FOREIGN KEY (voter_user_id) REFERENCES users (id)
);

-- 11. MISSION (AI 랜덤 미션)
CREATE TABLE IF NOT EXISTS missions (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    gacha_result_id BIGINT NOT NULL,
    user_id         BIGINT NOT NULL,
    content         VARCHAR(255) NOT NULL,
    is_completed    BOOLEAN NOT NULL DEFAULT FALSE,
    generated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at    TIMESTAMP NULL,
    CONSTRAINT fk_miss_result FOREIGN KEY (gacha_result_id) REFERENCES gacha_results (id) ON DELETE CASCADE,
    CONSTRAINT fk_miss_user FOREIGN KEY (user_id) REFERENCES users (id)
);

-- 12. CURATION_PLAN (AI 맞춤 코스 플랜)
CREATE TABLE IF NOT EXISTS curation_plans (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    gacha_result_id BIGINT NULL,
    destination_id  BIGINT NOT NULL,
    title           VARCHAR(150) NOT NULL,
    travel_start    DATE NOT NULL,
    travel_end      DATE NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'UPCOMING',
    is_saved        BOOLEAN NOT NULL DEFAULT FALSE,
    ai_generated_at TIMESTAMP NULL,
    saved_at        TIMESTAMP NULL,
    CONSTRAINT fk_cur_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_cur_res FOREIGN KEY (gacha_result_id) REFERENCES gacha_results (id) ON DELETE SET NULL,
    CONSTRAINT fk_cur_dest FOREIGN KEY (destination_id) REFERENCES destinations (id)
);

-- 13. PLACE (추천 장소)
CREATE TABLE IF NOT EXISTS places (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    destination_id  BIGINT NOT NULL,
    name            VARCHAR(100) NOT NULL,
    category        VARCHAR(30) NOT NULL,
    address         VARCHAR(255) NULL,
    description     TEXT NULL,
    image_url       VARCHAR(500) NULL,
    latitude        DOUBLE NULL,
    longitude       DOUBLE NULL,
    CONSTRAINT fk_place_dest FOREIGN KEY (destination_id) REFERENCES destinations (id) ON DELETE CASCADE
);

-- 14. DAILY_COURSE (Day별 코스)
CREATE TABLE IF NOT EXISTS daily_courses (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    curation_plan_id    BIGINT NOT NULL,
    day_number          INT NOT NULL,
    memo                VARCHAR(255) NULL,
    CONSTRAINT fk_course_plan FOREIGN KEY (curation_plan_id) REFERENCES curation_plans (id) ON DELETE CASCADE
);

-- 15. DAILY_COURSE_PLACE (코스에 포함된 장소 매핑)
CREATE TABLE IF NOT EXISTS daily_course_places (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    daily_course_id BIGINT NOT NULL,
    place_id        BIGINT NOT NULL,
    order_index     INT NOT NULL DEFAULT 1,
    tip             VARCHAR(255) NULL,
    CONSTRAINT fk_dcp_course FOREIGN KEY (daily_course_id) REFERENCES daily_courses (id) ON DELETE CASCADE,
    CONSTRAINT fk_dcp_place FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE CASCADE
);

-- 16. VISITED_DESTINATION (지도용 방문 지역 기록)
CREATE TABLE IF NOT EXISTS visited_destinations (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    destination_id  BIGINT NOT NULL,
    visited_date    DATE NOT NULL,
    recorded_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vis_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_vis_dest FOREIGN KEY (destination_id) REFERENCES destinations (id) ON DELETE CASCADE
);

-- 17. TRAVEL_RECORD (마이트립 여행 기록)
CREATE TABLE IF NOT EXISTS travel_records (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT NOT NULL,
    destination_id      BIGINT NOT NULL,
    curation_plan_id    BIGINT NULL,
    travel_date         DATE NOT NULL,
    duration            VARCHAR(30) NOT NULL DEFAULT '당일치기',
    memo                TEXT NULL,
    photo_url           VARCHAR(500) NULL,
    created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rec_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_rec_dest FOREIGN KEY (destination_id) REFERENCES destinations (id),
    CONSTRAINT fk_rec_plan FOREIGN KEY (curation_plan_id) REFERENCES curation_plans (id) ON DELETE SET NULL
);

-- 18. BADGE & USER_BADGE (키링/배지 컬렉션)
CREATE TABLE IF NOT EXISTS badges (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(100) NOT NULL,
    description         VARCHAR(255) NULL,
    image_url           VARCHAR(500) NULL,
    region              VARCHAR(50) NULL,
    unlock_condition    VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS user_badges (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    badge_id    BIGINT NOT NULL,
    acquired_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ub_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_ub_badge FOREIGN KEY (badge_id) REFERENCES badges (id) ON DELETE CASCADE
);

-- 19. NOTIFICATION (알림)
CREATE TABLE IF NOT EXISTS notifications (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    type        VARCHAR(30) NOT NULL,
    title       VARCHAR(150) NOT NULL,
    body        TEXT NOT NULL,
    is_read     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    read_at     TIMESTAMP NULL,
    CONSTRAINT fk_noti_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- 20. SUPPORT & ADMIN (1:1문의, 신고, 공지사항, 가챠정책)
CREATE TABLE IF NOT EXISTS notices (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    admin_user_id   BIGINT NOT NULL,
    title           VARCHAR(200) NOT NULL,
    content         TEXT NOT NULL,
    is_published    BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notice_admin FOREIGN KEY (admin_user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS gacha_policies (
    id                          BIGINT AUTO_INCREMENT PRIMARY KEY,
    weight_user_preference      FLOAT NOT NULL DEFAULT 0.35,
    weight_distance             FLOAT NOT NULL DEFAULT 0.25,
    weight_weather              FLOAT NOT NULL DEFAULT 0.15,
    weight_budget               FLOAT NOT NULL DEFAULT 0.15,
    weight_discovery            FLOAT NOT NULL DEFAULT 0.10,
    rule_exclude_recent_30days  BOOLEAN NOT NULL DEFAULT TRUE,
    rule_exclude_inactive       BOOLEAN NOT NULL DEFAULT TRUE,
    rule_penalize_bad_weather   BOOLEAN NOT NULL DEFAULT TRUE,
    rule_limit_same_region      BOOLEAN NOT NULL DEFAULT TRUE,
    rule_correct_metro_bias     BOOLEAN NOT NULL DEFAULT FALSE,
    version                     VARCHAR(30) NOT NULL,
    deploy_status               VARCHAR(20) NOT NULL DEFAULT 'LIVE',
    deployed_by                 BIGINT NULL,
    deployed_at                 TIMESTAMP NULL,
    created_at                  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

SET REFERENTIAL_INTEGRITY TRUE;
