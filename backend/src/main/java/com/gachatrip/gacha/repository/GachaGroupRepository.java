package com.gachatrip.gacha.repository;

import com.gachatrip.gacha.domain.GachaGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GachaGroupRepository extends JpaRepository<GachaGroup, Long> {
    Optional<GachaGroup> findByRoomCode(String roomCode);
}
