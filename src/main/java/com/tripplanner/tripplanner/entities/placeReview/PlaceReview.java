package com.tripplanner.tripplanner.entities.placeReview;

import com.tripplanner.tripplanner.entities.place.Place;
import com.tripplanner.tripplanner.entities.user.User;
import lombok.Data;
import org.ocpsoft.prettytime.PrettyTime;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Data
@Entity
@Table(name = "place_review")
public class PlaceReview {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Timestamp createdAt;

    private boolean isAccessible;

    public String getSinceCreatedString() {
        // get time since course has been created in pretty format:
        PrettyTime t = new PrettyTime(new Date(System.currentTimeMillis()));
        return t.format(new Date(createdAt.getTime()));
    }

    public void updateCourseTimestamp() {
        Timestamp reviewCreatedAt = new Timestamp(System.currentTimeMillis());
        setCreatedAt(reviewCreatedAt);
    }
}
