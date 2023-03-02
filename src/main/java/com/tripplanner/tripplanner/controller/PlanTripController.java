package com.tripplanner.tripplanner.controller;

import com.tripplanner.tripplanner.entities.place.Place;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PlanTripController {

    @GetMapping(value = "/devapi/findplace")
    public List<Place> planTrip(@RequestParam String lookingFor,
                                @RequestParam String locationName) {
        System.out.println("Hello there");
        return new ArrayList<>();
    }

}
