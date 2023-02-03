package de.ostfalia.wsamis.repository;

import de.ostfalia.wsamis.businessobject.Film;
import de.ostfalia.wsamis.businessobject.Film_;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

/**
 * Repository für alle Datenbankzugriffe bezüglich der Filme.
 */
@ApplicationScoped
public class FilmRepository {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Ermittelt alle Filme aus der Datenbank.
     *
     * @return alle Filme
     */
    public List<Film> getAllFilms() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Film> criteriaQuery = criteriaBuilder.createQuery(Film.class);
        Root<Film> root = criteriaQuery.from(Film.class);
        CriteriaQuery<Film> all = criteriaQuery.select(root);

        return entityManager.createQuery(all).getResultList();
    }

    /**
     * Gibt den Film anhand der ID aus der Datenbank zurück
     *
     * @param filmId - ID des Films
     * @return Film
     */
    public Film getFilmById(UUID filmId) {
        return entityManager.find(Film.class, filmId);
    }

    /**
     * Ermittelt alle Film-IDs aus der Datenbank.
     *
     * @return alle Film-IDs
     */
    public List<UUID> getAllFilmIds() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<UUID> criteriaQuery = criteriaBuilder.createQuery(UUID.class);

        Root<Film> films = criteriaQuery.from(Film.class);

        criteriaQuery.select(films.get(Film_.id));

        return entityManager.createQuery(criteriaQuery).getResultList();
    }

    /**
     * Ermittelt alle Filme mit passendem Filmtitel.
     *
     * @param filmTitle - Titel des Filmes
     * @return alle Filme mit passendem Titel
     */
    public List<Film> getFilmsByTitle(String filmTitle) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Film> query = criteriaBuilder.createQuery(Film.class);

        Root<Film> root = query.from(Film.class);

        query.select(root);

        query.where(criteriaBuilder.like(criteriaBuilder.lower(root.get(Film_.title)),
                "%" + filmTitle.toLowerCase() + "%"));

        return entityManager.createQuery(query).getResultList();
    }

}
