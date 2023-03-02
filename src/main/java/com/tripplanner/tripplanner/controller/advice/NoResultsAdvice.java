package com.tripplanner.tripplanner.controller.advice;

import com.tripplanner.tripplanner.exceptions.UserEmailNotUniqueException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.persistence.NoResultException;

@ControllerAdvice
public class NoResultsAdvice {

    @ResponseBody
    @ExceptionHandler(NoResultException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String noResultsHandler(NoResultException ex) {

        return ex.getMessage();
    }
}
