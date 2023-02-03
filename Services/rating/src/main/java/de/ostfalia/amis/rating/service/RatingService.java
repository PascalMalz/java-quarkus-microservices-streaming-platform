package de.ostfalia.amis.rating.service;

import de.ostfalia.amis.rating.model.Rating;
import de.ostfalia.amis.rating.repository.RatingRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class RatingService {

    private final RatingRepository ratingRepository;
    private String exeptionMessage;

    @Inject
    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public double getRatingForFilm(String filmId) {

        int sumRatings = 0;
        int countRatings = 0;

        List<Rating> ratings = ratingRepository.getRatingsByFilmId(UUID.fromString(filmId));
        for (Rating rating: ratings) {
            sumRatings += rating.getValue();
            countRatings++;
        }

        return round2Digits((double) sumRatings / countRatings);
    }


    private double round2Digits(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    public String addRatingToFilm(String filmId, String userId, int value) {
        List<Rating> ratings = ratingRepository.getRatingsByFilmId(UUID.fromString(filmId));
        Boolean firstRating = true;
        for (Rating rating: ratings){
            if (rating.getUserId().toString() == userId){
                firstRating = false;
            }
        }
        if (firstRating == true){
        Rating rating = new Rating(UUID.fromString(filmId), UUID.fromString(userId), value);
        ratingRepository.insertRating(rating);
        }else
        exeptionMessage = "Film wurde bereits Bewertet";
        return exeptionMessage;
        
    }
}
