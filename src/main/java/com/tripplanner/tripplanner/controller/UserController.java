package com.tripplanner.tripplanner.controller;

import com.tripplanner.tripplanner.entities.placeReview.PlaceReview;
import com.tripplanner.tripplanner.entities.user.CustomUserDetails;
import com.tripplanner.tripplanner.entities.user.User;
import com.tripplanner.tripplanner.exceptions.UserEmailNotUniqueException;
import com.tripplanner.tripplanner.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @RequestMapping("/devapi/user")
    public User user(Authentication authentication) {
        User user = null;
        if (authentication != null) {
            user = ((CustomUserDetails)authentication.getPrincipal()).getUser();

            // we do this to synchronize the user with the session:
            user = userService.findById(user.getId());
        }

        return user;
    }

    @RequestMapping(value = "/devapi/register", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public User registerUser(@RequestBody User user) throws UserEmailNotUniqueException {

        return userService.registerUser(user);
    }
}
