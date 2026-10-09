package com.gachatrip.destination.repository;

import com.gachatrip.destination.domain.Destination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
    Optional<Destination> findByContentId(String contentId);

    List<Destination> findByIsActiveTrue();

    @Query("SELECT d FROM Destination d WHERE d.isActive = true " +
           "AND (:region IS NULL OR d.region = :region OR d.address LIKE %:region%) " +
           "AND (:keyword IS NULL OR d.title LIKE %:keyword% OR d.overview LIKE %:keyword%)")
    Page<Destination> searchDestinations(
            @Param("region") String region,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    @Query("SELECT d FROM Destination d WHERE d.isActive = true AND (:region IS NULL OR d.region = :region)")
    List<Destination> findByRegionAndActive(@Param("region") String region);
}