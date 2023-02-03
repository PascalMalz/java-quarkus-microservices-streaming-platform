package de.ostfalia.amis.rating.repository;

import de.ostfalia.amis.rating.model.Rating;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class RatingRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Rating> getRatingsByFilmId(UUID filmId) {
        return entityManager.createNamedQuery("Rating.selectByFilmId", Rating.class)
                .setParameter("filmId", filmId)
                .getResultList();
    }

    @Transactional
    public void insertRating(Rating rating) {
        entityManager.persist(rating);
    }
}
