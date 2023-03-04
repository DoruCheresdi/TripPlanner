package com.tripplanner.tripplanner.controller.advice;

import com.tripplanner.tripplanner.exceptions.PlaceHasNoReviewsException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.persistence.NoResultException;

@ControllerAdvice
public class PlaceHasNoReviewsAdvice {

    @ResponseBody
    @ExceptionHandler(PlaceHasNoReviewsException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String PlaceHasNoReviewsHandler(PlaceHasNoReviewsException ex) {

        return ex.getMessage();
    }
}
