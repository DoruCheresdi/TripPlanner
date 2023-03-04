package com.tripplanner.tripplanner.controller;

import com.tripplanner.tripplanner.entities.placeReview.PlaceReview;
import com.tripplanner.tripplanner.entities.placeReview.PlaceReviewDTO;
import com.tripplanner.tripplanner.entities.user.CustomUserDetails;
import com.tripplanner.tripplanner.entities.user.User;
import com.tripplanner.tripplanner.exceptions.PlaceHasNoReviewsException;
import com.tripplanner.tripplanner.exceptions.UserEmailNotUniqueException;
import com.tripplanner.tripplanner.service.reviews.PlaceReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
public class PlaceReviewController {

    private final PlaceReviewService placeReviewService;

    @RequestMapping(value = "/devapi/addreview", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addPlaceReview(@RequestBody Map<String, String> json,
                               Authentication authentication) {

        // @RequestBody only works with 1 parameter, so we must use a map

        String isAccessible = json.get("isAccessible");
        String placeName = json.get("placeName");
        boolean isAcc;
            if (isAccessible.equals("true")) {
            isAcc = true;
        } else {
            isAcc = false;
        }

        User user = ((CustomUserDetails)authentication.getPrincipal()).getUser();
        placeReviewService.createReview(placeName, user.getEmail(), isAcc);
    }

    @RequestMapping(value = "/devapi/getlatestreview", method = RequestMethod.GET)
    public PlaceReviewDTO getLatestReview(@RequestParam String placeName) throws PlaceHasNoReviewsException {

        PlaceReviewDTO placeReviewDTO = new PlaceReviewDTO(placeReviewService.getLatestReview(placeName));
        return placeReviewDTO;
    }
}
