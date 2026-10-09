-- ========================================================
-- 🎲 가챠트립 (GachaTrip) MySQL 전체 스키마 & 테이블 DDL
-- ========================================================

-- 1. 데이터베이스 생성 및 선택
CREATE DATABASE IF NOT EXISTS `gachatrip` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `gachatrip`;

-- 2. 유저 테이블 (users)
DROP TABLE IF EXISTS `party_members`;
DROP TABLE IF EXISTS `party_rooms`;
DROP TABLE IF EXISTS `draw_records`;
DROP TABLE IF EXISTS `mytrip_records`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(100) NOT NULL,
  `bio` VARCHAR(255) DEFAULT '가챠트립으로 새로운 여행지 탐험 중!',
  `avatar_url` VARCHAR(500) DEFAULT NULL,
  `preferred_styles` VARCHAR(255) DEFAULT '힐링,맛집',
  `departure_region` VARCHAR(100) DEFAULT '인천광역시',
  `default_budget` VARCHAR(100) DEFAULT '30만원 이하',
  `notification_days` VARCHAR(100) DEFAULT '월,수,금,토',
  `notification_time` VARCHAR(50) DEFAULT '오후 7:30',
  `notification_enabled` BOOLEAN DEFAULT TRUE,
  `dnd_enabled` BOOLEAN DEFAULT TRUE,
  `location_recommendation_enabled` BOOLEAN DEFAULT TRUE,
  `recommendation_radius` INT DEFAULT 150,
  `language` VARCHAR(10) DEFAULT 'ko',
  `linked_kakao` BOOLEAN DEFAULT TRUE,
  `linked_google` BOOLEAN DEFAULT FALSE,
  `linked_apple` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 가챠 추첨 기록 테이블 (draw_records)
CREATE TABLE `draw_records` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT DEFAULT NULL,
  `destination_name` VARCHAR(100) NOT NULL,
  `region_name` VARCHAR(100) DEFAULT NULL,
  `summary` VARCHAR(255) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `hashtags` VARCHAR(255) DEFAULT NULL,
  `image_url` VARCHAR(1000) DEFAULT NULL,
  `travel_time` VARCHAR(100) DEFAULT NULL,
  `weather` VARCHAR(50) DEFAULT NULL,
  `estimated_budget` INT DEFAULT 200000,
  `confirmed` BOOLEAN DEFAULT FALSE,
  `is_group` BOOLEAN DEFAULT FALSE,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. 그룹방 테이블 (party_rooms)
CREATE TABLE `party_rooms` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(10) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `max_members` INT DEFAULT 4,
  `style` VARCHAR(50) DEFAULT '힐링',
  `date` VARCHAR(50) DEFAULT NULL,
  `budget` VARCHAR(50) DEFAULT '10만원 이하',
  `status` VARCHAR(20) DEFAULT 'LOBBY',
  `winner_nickname` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. 그룹방 멤버 테이블 (party_members)
CREATE TABLE `party_members` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `party_room_id` BIGINT NOT NULL,
  `nickname` VARCHAR(100) NOT NULL,
  `is_leader` BOOLEAN DEFAULT FALSE,
  `submitted_destinations` VARCHAR(255) DEFAULT NULL,
  `is_submitted` BOOLEAN DEFAULT FALSE,
  `avatar_color` VARCHAR(50) DEFAULT 'bg-blue-500',
  `mission_score` INT DEFAULT 0,
  `is_winner_bonus` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_party_member_room` FOREIGN KEY (`party_room_id`) REFERENCES `party_rooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. 마이트립 저장 일정 테이블 (mytrip_records)
CREATE TABLE `mytrip_records` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT DEFAULT NULL,
  `destination_name` VARCHAR(100) NOT NULL,
  `dates` VARCHAR(100) DEFAULT NULL,
  `timeline_json` TEXT DEFAULT NULL,
  `memo` TEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_mytrip_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. 초기 샘플 데이터 삽입 (테스트 계정)
-- 비밀번호: Password123! (BCrypt 해시 적용)
INSERT INTO `users` (`email`, `password`, `nickname`, `bio`, `avatar_url`, `preferred_styles`, `departure_region`, `default_budget`, `language`)
VALUES (
  'example@gachatrip.app',
  '$2a$10$7v1b1lK9Z5eU5z0V8k1yjeK9Z5eU5z0V8k1yjeK9Z5eU5z0V8k1yj',
  '여행자 이은지',
  '가챠트립으로 새로운 여행지 탐험 중!',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  '힐링,맛집',
  '인천광역시',
  '30만원 이하',
  'ko'
);
