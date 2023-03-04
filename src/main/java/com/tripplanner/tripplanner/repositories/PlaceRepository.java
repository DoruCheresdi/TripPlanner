package com.tripplanner.tripplanner.repositories;

import com.tripplanner.tripplanner.entities.place.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {

    Optional<Place> findByName(String name);
}
