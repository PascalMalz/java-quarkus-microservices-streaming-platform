package de.ostfalia.wsamis.repository;

import de.ostfalia.wsamis.businessobject.Favourite;
import de.ostfalia.wsamis.businessobject.FavouriteId;
import de.ostfalia.wsamis.businessobject.Favourite_;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

/**
 * Repository für alle Datenbankzugriffe bezüglich der Favoriten.
 */
@ApplicationScoped
public class FavouriteRepository {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Gibt alle Favoriten für einen User, anhand seiner ID zurück.
     *
     * @param userId - ID des Users
     * @return alle Favoriten des Users
     */
    public List<Favourite> getFavouritesByUserId(UUID userId) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        CriteriaQuery<Favourite> query = criteriaBuilder.createQuery(Favourite.class);

        Root<Favourite> root  = query.from(Favourite.class);
        query.select(root);

        query.where(criteriaBuilder.equal(root.get(Favourite_.userId), userId));

        return entityManager.createQuery(query).getResultList();
    }

    /**
     * Ermittelt ein Favoriten anhand der ID des Users und des Filmes
     *
     * @param filmId - ID des Filmes
     * @param userId - ID des Users
     * @return Favorit
     */
    public Favourite getFavouriteById(UUID filmId, UUID userId) {
        return entityManager.find(Favourite.class, new FavouriteId(userId, filmId));
    }

    /**
     * Fügt einen neuen Favoriten zur Datenbank hinzu.
     *
     * @param newFavourite - neuer Favourit
     */
    public void addFilmToUserFavourites(Favourite newFavourite) {
        entityManager.persist(newFavourite);
    }

    /**
     * Entfernt einen Favoriten aus der Datenbank.
     *
     * @param favourite - zu entfernender Favourit
     */
    public void removeFavourite(Favourite favourite) {
        if (!entityManager.contains(favourite)) {
            favourite = entityManager.merge(favourite);
        }
        entityManager.remove(favourite);
    }
}
