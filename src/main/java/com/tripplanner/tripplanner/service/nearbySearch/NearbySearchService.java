package com.tripplanner.tripplanner.service.nearbySearch;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripplanner.tripplanner.entities.place.Place;
import com.tripplanner.tripplanner.entities.place.Position;
import com.tripplanner.tripplanner.secret.GoogleKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class NearbySearchService {

    public List<Place> doNearbySearch(String keyword, Position location, Float radius) {

        log.info("Doing nearby search for {} at {},{}", keyword, location.getLatitude(), location.getLongitude());
        RestTemplate restTemplate = new RestTemplate();

        String googleURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        googleURL = googleURL + "keyword=" + keyword;
        googleURL = googleURL + "&location=" + location.getLatitude() + "," + location.getLongitude();
        googleURL = googleURL + "&radius=" + radius;
        googleURL = googleURL + "&key=" + GoogleKey.googleKey;

        log.info("Request URL: {}", googleURL);

        ResponseEntity<String> response = restTemplate.getForEntity(googleURL, String.class);

        // get all places close to the landmarks selected:
        List<Place> places = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            // parse locations:
            List<Position> positions = new ArrayList<>();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode results = root.path("results");
            for (JsonNode result : results) {
                // get place name:
                String placeName = result.path("name").asText();

                // get place position:
                JsonNode geometry = result.path("geometry");
                JsonNode nodePos = geometry.path("location");
                JsonNode lat = nodePos.path("lat");
                JsonNode lng = nodePos.path("lng");
                Position currentPosition = new Position((float) lat.asDouble(), (float) lng.asDouble());

                places.add(new Place(currentPosition, placeName));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return places;
    }
}
