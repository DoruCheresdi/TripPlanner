package com.tripplanner.tripplanner.controller;

import com.tripplanner.tripplanner.entities.place.Place;
import com.tripplanner.tripplanner.entities.place.Position;
import com.tripplanner.tripplanner.exceptions.UserEmailNotUniqueException;
import com.tripplanner.tripplanner.service.semanticSearch.SemanticSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class PlanTripController {

    private final SemanticSearchService semanticSearchService;

    @GetMapping(value = "/devapi/findplacesemantic")
    public List<Place> getLocationsSemanticSearch(@RequestParam String landmarkName,
                                                  @RequestParam String soughtPlaceName,
                                                  @RequestParam Float lat,
                                                  @RequestParam Float lng) throws NoResultException {

        Position pos = new Position(lat, lng);

        return semanticSearchService.semanticSearch(landmarkName, soughtPlaceName, pos);
    }

}
