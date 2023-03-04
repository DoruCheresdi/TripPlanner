package com.tripplanner.tripplanner.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.util.ArrayList;
import java.util.List;

public class Utils {
  private static final String[] singleStations = {
      "Mihai Bravu",
      "Muncii",
      "Nicolae Grigorescu 2"
  };

  private static final String[] invalidExchanges = {
    "Unirii",
    "Eroilor"
  };

  public static boolean isAccessible(String instruction) {
    for (String station : singleStations) {
      if (instruction.contains((station))) {
        return false;
      }
    }

    return true;
  }

  public static boolean isAccessibleByExchange(ArrayNode steps) {
    List<String> list = new ArrayList<>();

    for (JsonNode node : steps) {
      list.add(node.path("html_instructions").asText());
    }

    return (list.stream().filter((instr) -> {
      for (String exchange : invalidExchanges) {
          if (instr.contains(exchange)) {
            return true;
          }
      }

      return false;
    }).count() == 2);
  }
}
