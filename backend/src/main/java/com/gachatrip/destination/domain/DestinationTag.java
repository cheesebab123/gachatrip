package com.gachatrip.destination.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "destination_tags")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DestinationTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id")
    private Destination destination;

    private String tagName;

    @Builder
    public DestinationTag(Destination destination, String tagName) {
        this.destination = destination;
        this.tagName = tagName;
    }
}