package com.tripplanner.tripplanner.entities.place;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class Position {

    private final Float latitude, longitude;
}
