package com.tripplanner.tripplanner.service.routeSearch;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.tripplanner.tripplanner.entities.place.Place;
import com.tripplanner.tripplanner.entities.place.Position;
import com.tripplanner.tripplanner.entities.route.Route;
import com.tripplanner.tripplanner.secret.GoogleKey;
import com.tripplanner.tripplanner.utils.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

@Service
@Slf4j
public class GetRouteService {
  public Route doRouteService(String destination, String location) {
    log.info("Doing routing search from {} to {}", location, destination);

    RestTemplate restTemplate = new RestTemplate();

    String googleURL = "https://maps.googleapis.com/maps/api/directions/json?";

    googleURL = googleURL + "origin=" + location.replace(" ", "+");
    googleURL = googleURL + "&destination=" + destination.replace(" ", "+");
    googleURL = googleURL + "&mode=transit&dir_action=navigate&transit_mode=subway";
    googleURL = googleURL + "&key=" + GoogleKey.googleKey;

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
      JsonNode info = ((ArrayNode) routes).get(0).path("legs").get(0);
      JsonNode poly = ((ArrayNode) routes).get(0);

      JsonNode start_location = info.path("start_location");
      JsonNode end_location = info.path("end_location");
      Position start = new Position((float) start_location.path("lat").asDouble(), (float) start_location.path("lng").asDouble());
      Position end = new Position((float) end_location.path("lat").asDouble(), (float) end_location.path("lng").asDouble());

      String path = poly.path("overview_polyline").path("points").asText();

      ArrayNode steps = (ArrayNode)info.path("steps");

      boolean subwayRoute = true;
      ArrayList<Place> stops = new ArrayList<>();
      String prevType = "TRANSIT";
      for (JsonNode node : steps) {
          String type = node.path("travel_mode").asText();

          if ((prevType.equals("WALKING") && type.equals("TRANSIT")) || (prevType.equals("TRANSIT") && type.equals("TRANSIT")) ) {

            JsonNode details = node.path("transit_details").path("departure_stop");

            log.info(details.path("location").path("lat").toString());
            log.info(details.path("name").asText());
            stops.add(new Place(new Position((float) details.path("location").path("lat").asDouble(), (float) details.path("location").path("lng").asDouble()), details.path("name").asText()));
          }

          prevType = node.path("travel_mode").asText();

          if (!type.equals("TRANSIT")) {
            continue;
          }

          // TODO: check for subways
          String subway = node.path("html_instructions").asText();

          if (Utils.isAccessible(subway)) {
              continue;
          }

          subwayRoute = false;
          break;
      }

      if (!subwayRoute || !Utils.isAccessibleByExchange(steps)) {
        googleURL = "https://maps.googleapis.com/maps/api/directions/json?";

        googleURL = googleURL + "origin=" + location.replace(" ", "+");
        googleURL = googleURL + "&destination=" + destination.replace(" ", "+");
        googleURL = googleURL + "&mode=transit&dir_action=navigate&transit_mode=bus";
        googleURL = googleURL + "&key=" + GoogleKey.googleKey;

        log.info("Second request URL: {}", googleURL);

        response = restTemplate.getForEntity(googleURL, String.class);
        root = mapper.readTree(response.getBody());
        status = root.path("status");

        if (!status.asText().equals("OK")) {
          throw new Exception();
        }

        routes = root.path("routes");
        poly = ((ArrayNode) routes).get(0);

        path = poly.path("overview_polyline").path("points").asText();
        log.info(path);
      }

      return new Route(path, start, end, stops);
    } catch (Exception e) {
      e.printStackTrace();
      return new Route("", new Position(0f, 0f), new Position(0f, 0f), new ArrayList<>());
    }
  }
}
