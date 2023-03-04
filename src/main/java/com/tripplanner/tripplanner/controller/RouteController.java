package com.tripplanner.tripplanner.controller;

import com.tripplanner.tripplanner.service.routeSearch.GetRouteService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RouteController {
  GetRouteService routeService;
  @GetMapping(value = "/devapi/findroute")
  public String getRoute(@RequestParam String source, @RequestParam String destination) {

    return routeService.doRouteService(destination, source);
  }
}
