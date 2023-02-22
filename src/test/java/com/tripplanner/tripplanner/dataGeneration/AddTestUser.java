package com.tripplanner.tripplanner.dataGeneration;

import com.tripplanner.tripplanner.entities.user.User;
import com.tripplanner.tripplanner.repositories.UserRepository;
import com.tripplanner.tripplanner.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
public class AddTestUser {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void addTestUser() {
        User user = new User();
        user.setEmail("test@test.com");
        user.setName("test");
        user.setPassword("test");
        userService.encodePassword(user);

        userRepository.save(user);
    }
}
