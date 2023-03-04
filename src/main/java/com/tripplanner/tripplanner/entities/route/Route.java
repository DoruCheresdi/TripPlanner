package com.tripplanner.tripplanner.entities.route;

import com.tripplanner.tripplanner.entities.place.Position;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class Route {
  private final String path;
  private final Position start;
  private final Position end;
}
