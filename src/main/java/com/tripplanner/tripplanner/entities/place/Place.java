package com.tripplanner.tripplanner.entities.place;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Place {

    private final Position position;

    private final String name;
}
