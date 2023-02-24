package com.tripplanner.tripplanner.service.user;

import com.tripplanner.tripplanner.entities.user.CustomUserDetails;
import com.tripplanner.tripplanner.entities.user.User;
import com.tripplanner.tripplanner.repositories.AuthorityRepository;
import com.tripplanner.tripplanner.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;

public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        User user = optionalUser.get();
        user.setAuthorities(new HashSet<>(authorityRepository.findAllByUserEmail(user.getEmail())));
        return new CustomUserDetails(user);
    }
}
