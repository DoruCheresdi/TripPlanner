package com.tripplanner.tripplanner.entities.placeReview;

import lombok.Data;

@Data
public class PlaceReviewDTO {

    public PlaceReviewDTO(PlaceReview placeReview) {
        this.createdAt = placeReview.getSinceCreatedString();
        this.isAccessible = String.valueOf(placeReview.isAccessible());
        this.placeName = placeReview.getPlace().getName();
    }

    private final String placeName;

    private final String createdAt;

    private final String isAccessible;
}
