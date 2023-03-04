package com.tripplanner.tripplanner.entities.place;

import com.tripplanner.tripplanner.entities.placeReview.PlaceReview;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Place {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    public Place (Position position, String name) {
        this.position = position;
        this.name = name;
    }

    @Embedded
    private Position position;


    @Column(unique=true)
    private String name;

    @OneToMany
    private List<PlaceReview> placeReview;
}
