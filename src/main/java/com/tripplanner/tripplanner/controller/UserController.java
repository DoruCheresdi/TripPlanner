package com.tripplanner.tripplanner.controller;

import com.tripplanner.tripplanner.entities.user.User;
import com.tripplanner.tripplanner.exceptions.UserEmailNotUniqueException;
import com.tripplanner.tripplanner.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @RequestMapping("/devapi/user")
    public Principal user(Principal user) {

        return user;
    }

    @RequestMapping(value = "/devapi/register", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public User registerUser(@RequestBody User user) throws UserEmailNotUniqueException {

        return userService.registerUser(user);
    }
}
