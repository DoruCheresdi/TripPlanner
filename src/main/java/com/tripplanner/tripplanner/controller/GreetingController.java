package com.tripplanner.tripplanner.controller;

import com.tripplanner.tripplanner.entities.user.CustomUserDetails;
import com.tripplanner.tripplanner.entities.user.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Controller
public class GreetingController {

    @GetMapping("/devapi/resource")
    @ResponseBody
    public Map<String, Object> home(Authentication authentication) {
        User user = ((CustomUserDetails)authentication.getPrincipal()).getUser();
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello " + user.getName());
        return model;
    }

}
