-- ========================================================
-- 🎲 가챠트립 (GachaTrip) H2 & MySQL 호환 DDL 스키마
-- ========================================================

-- 1. 유저 테이블 (users)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    bio VARCHAR(255) DEFAULT '가챠트립으로 새로운 여행지 탐험 중!',
    avatar_url VARCHAR(500) NULL,
    preferred_styles VARCHAR(255) DEFAULT '힐링,맛집',
    departure_region VARCHAR(100) DEFAULT '인천광역시',
    default_budget VARCHAR(100) DEFAULT '30만원 이하',
    notification_days VARCHAR(100) DEFAULT '월,수,금,토',
    notification_time VARCHAR(50) DEFAULT '오후 7:30',
    notification_enabled BOOLEAN DEFAULT TRUE,
    dnd_enabled BOOLEAN DEFAULT TRUE,
    location_recommendation_enabled BOOLEAN DEFAULT TRUE,
    recommendation_radius INT DEFAULT 150,
    language VARCHAR(10) DEFAULT 'ko',
    linked_kakao BOOLEAN DEFAULT TRUE,
    linked_google BOOLEAN DEFAULT FALSE,
    linked_apple BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 여행지 테이블 (destinations)
CREATE TABLE IF NOT EXISTS destinations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content_id VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    region VARCHAR(50) NULL,
    address VARCHAR(255) NULL,
    image_url VARCHAR(500) NULL,
    capsule_image_url VARCHAR(500) NULL,
    latitude DOUBLE NULL,
    longitude DOUBLE NULL,
    is_active BOOLEAN DEFAULT TRUE,
    overview TEXT NULL
);

-- 3. 여행지 태그 테이블 (destination_tags)
CREATE TABLE IF NOT EXISTS destination_tags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    destination_id BIGINT NOT NULL,
    tag_name VARCHAR(50) NOT NULL,
    CONSTRAINT fk_tag_dest FOREIGN KEY (destination_id) REFERENCES destinations (id) ON DELETE CASCADE
);

-- 4. 가챠 뽑기 기록 테이블 (gacha_draws)
CREATE TABLE IF NOT EXISTS gacha_draws (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL,
    destination_name VARCHAR(100) NOT NULL,
    region_name VARCHAR(100) NULL,
    summary TEXT NULL,
    description TEXT NULL,
    hashtags VARCHAR(255) NULL,
    image_url VARCHAR(1000) NULL,
    capsule_image_url VARCHAR(1000) NULL,
    travel_time VARCHAR(100) NULL,
    weather VARCHAR(50) NULL,
    estimated_budget INT DEFAULT 200000,
    confirmed BOOLEAN DEFAULT FALSE,
    is_group BOOLEAN DEFAULT FALSE,
    group_room_code VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. 그룹 뽑기 방 테이블 (gacha_groups)
CREATE TABLE IF NOT EXISTS gacha_groups (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_code VARCHAR(50) NOT NULL UNIQUE,
    host_user_id BIGINT NOT NULL,
    title VARCHAR(100) NOT NULL,
    style VARCHAR(50) NULL,
    departure VARCHAR(50) NULL,
    budget VARCHAR(50) NULL,
    max_members INT DEFAULT 6,
    status VARCHAR(20) DEFAULT 'WAITING',
    selected_destination_id BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. 그룹 멤버 테이블 (gacha_group_members)
CREATE TABLE IF NOT EXISTS gacha_group_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    group_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    is_ready BOOLEAN DEFAULT FALSE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_member_group FOREIGN KEY (group_id) REFERENCES gacha_groups (id) ON DELETE CASCADE
);
