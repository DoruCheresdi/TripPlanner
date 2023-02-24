package com.tripplanner.tripplanner.controller.advice;

import com.tripplanner.tripplanner.exceptions.UserEmailNotUniqueException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class UserEmailNotUniqueAdvice {

    @ResponseBody
    @ExceptionHandler(UserEmailNotUniqueException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String userEmailNotUniqueHandler(UserEmailNotUniqueException ex) {
        return ex.getMessage();
    }
}
