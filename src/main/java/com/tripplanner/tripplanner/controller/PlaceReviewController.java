package com.tripplanner.tripplanner.controller;

import com.tripplanner.tripplanner.entities.placeReview.PlaceReview;
import com.tripplanner.tripplanner.entities.user.CustomUserDetails;
import com.tripplanner.tripplanner.entities.user.User;
import com.tripplanner.tripplanner.exceptions.UserEmailNotUniqueException;
import com.tripplanner.tripplanner.service.reviews.PlaceReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class PlaceReviewController {

    private final PlaceReviewService placeReviewService;

    @RequestMapping(value = "/devapi/addreview", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addPlaceReview(@RequestBody String placeName,
                               @RequestBody boolean isAccessible,
                               Authentication authentication) throws UserEmailNotUniqueException {

        User user = ((CustomUserDetails)authentication.getPrincipal()).getUser();
        placeReviewService.createReview(placeName, user.getEmail(), isAccessible);
    }
}
