package com.gachatrip.gacha.repository;

import com.gachatrip.gacha.domain.GachaDraw;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GachaDrawRepository extends JpaRepository<GachaDraw, Long> {
    List<GachaDraw> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<GachaDraw> findByGroupRoomCodeOrderByCreatedAtDesc(String groupRoomCode);
}
