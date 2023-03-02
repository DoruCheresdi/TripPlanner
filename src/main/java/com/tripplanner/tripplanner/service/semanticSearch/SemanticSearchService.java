package com.tripplanner.tripplanner.service.semanticSearch;

import com.tripplanner.tripplanner.entities.place.Place;
import com.tripplanner.tripplanner.entities.place.Position;
import com.tripplanner.tripplanner.service.nearbySearch.NearbySearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SemanticSearchService {

    private final NearbySearchService nearbySearchService;

    /**
     * Does a semantic search for soughtPlaceName around places called landmarkName,
     * searching for landmarks around position
     * @param landmarkName
     * @param soughtPlaceName
     * @param position
     * @return
     */
    public List<Place> semanticSearch(String landmarkName, String soughtPlaceName, Position position) {

        List<Place> soughtPlaces = new ArrayList<>();

        // request possible locations for the landmarks(by locationName)
        // radius in meters:
        Float landmarkRadius = 5000f;
        List<Place> landmarks = nearbySearchService.doNearbySearch(landmarkName, position, landmarkRadius);

        if (landmarks.size() == 0) {
            throw new NoResultException("Landmarks not found");
        }
        // restrict number of landmarks:
        int numberResults = 2;
        if (landmarks.size() == 1) {
            numberResults = 1;
        }

        // for the first 2 landmarks, send requests looking for the places sought
        Float placeRadius = 1000f;
        for (int i = 0 ; i < numberResults; i++) {
            soughtPlaces.addAll(nearbySearchService.doNearbySearch(soughtPlaceName, landmarks.get(i).getPosition(), placeRadius));
        }

        // combine lists and return
        if (soughtPlaces.size() == 0) {
            throw new NoResultException("No results found");
        }
        return soughtPlaces;
    }
}
