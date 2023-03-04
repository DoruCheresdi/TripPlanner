package com.tripplanner.tripplanner.service.routeSearch;

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
public class GetRouteService {
  public String doRouteService(String destination, String location) {
    log.info("Doing routing search from {} to {}", location, destination);

    RestTemplate restTemplate = new RestTemplate();

    String googleURL = "https://maps.googleapis.com/maps/api/directions/json?";

    googleURL = googleURL + "origin=" + location.replace(" ", "+");
    googleURL = googleURL + "&destination=" + destination.replace(" ", "+");
    googleURL = googleURL + "&key=" + GoogleKey.googleKey;
    googleURL = googleURL + "&mode=transit";//&dir/_action=navigate&transit_mode=subway";

    log.info("Request URL: {}", googleURL);

    ResponseEntity<String> response = restTemplate.getForEntity(googleURL, String.class);

    ObjectMapper mapper = new ObjectMapper();

    try {
      JsonNode root = mapper.readTree(response.getBody());
      JsonNode status = root.path("status");

      if (!status.asText().equals("OK")) {
        throw new Exception();
      }

      JsonNode routes = root.path("routes");
      JsonNode info = routes.path("0");
      System.out.println(routes.path("overview_polyline").path("points").asText());
      return routes.path("overview_polyline").path("points").asText();
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
