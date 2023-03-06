package com.tripplanner.tripplanner.repositories;

import com.tripplanner.tripplanner.entities.place.Place;
import com.tripplanner.tripplanner.entities.placeReview.PlaceReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceReviewRepository extends JpaRepository<PlaceReview, Long> {

    List<PlaceReview> findAllByPlace(Place place);
}
