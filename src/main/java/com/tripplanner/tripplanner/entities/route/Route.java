package com.tripplanner.tripplanner.entities.route;

import com.tripplanner.tripplanner.entities.place.Place;
import com.tripplanner.tripplanner.entities.place.Position;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;

@RequiredArgsConstructor
@Data
public class Route {
  private final String path;
  private final Position start;
  private final Position end;
  private final ArrayList<Place> stops;
}
