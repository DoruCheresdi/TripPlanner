package com.tripplanner.tripplanner.exceptions;

public class PlaceHasNoReviewsException extends Exception {

    public PlaceHasNoReviewsException(String placeName) {
        super("place " + placeName + " has no reviews");
    }
}
