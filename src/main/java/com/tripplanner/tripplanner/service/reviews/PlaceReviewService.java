package com.tripplanner.tripplanner.service.reviews;

import com.tripplanner.tripplanner.entities.place.Place;
import com.tripplanner.tripplanner.entities.placeReview.PlaceReview;
import com.tripplanner.tripplanner.entities.user.User;
import com.tripplanner.tripplanner.exceptions.PlaceHasNoReviewsException;
import com.tripplanner.tripplanner.repositories.PlaceRepository;
import com.tripplanner.tripplanner.repositories.PlaceReviewRepository;
import com.tripplanner.tripplanner.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceReviewService {

    private final UserRepository userRepository;

    private final PlaceRepository placeRepository;

    private final PlaceReviewRepository placeReviewRepository;

    public void createReview(String placeName, String userEmail, boolean isAccessible) {
        PlaceReview placeReview = new PlaceReview();

        placeReview.setAccessible(isAccessible);
        placeReview.updateCourseTimestamp();

        User user = userRepository.findByEmail(userEmail).get();
        Place place = placeRepository.findByName(placeName).get();

        placeReview.setUser(user);
        placeReview.setPlace(place);

        placeReviewRepository.save(placeReview);
    }

    public PlaceReview getLatestReview(String placeName) throws PlaceHasNoReviewsException {
        Place place = placeRepository.findByName(placeName)
                .orElseThrow(() -> new PlaceHasNoReviewsException(placeName));

        // TODO when more time is available, do this search in SQL:
        List<PlaceReview> placeReviews = placeReviewRepository.findAllByPlace(place);
        if (placeReviews.isEmpty()) {
            throw new PlaceHasNoReviewsException(placeName);
        }

        placeReviews.sort(Comparator.comparing(PlaceReview::getCreatedAt));
        // modify this to placeReview.get(placeReviews.size() - 1) if not working correctly
        return placeReviews.get(0);
    }
}
