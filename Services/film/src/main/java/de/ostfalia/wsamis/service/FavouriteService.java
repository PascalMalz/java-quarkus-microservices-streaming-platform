package de.ostfalia.wsamis.service;

import de.ostfalia.wsamis.businessobject.Favourite;
import de.ostfalia.wsamis.businessobject.Film;
import de.ostfalia.wsamis.repository.FavouriteRepository;
import de.ostfalia.wsamis.repository.FilmRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Service für die Fachlogik bezüglich der Favoriten.
 */
@ApplicationScoped
public class FavouriteService {

    /**
     * Repository für Film-Datenbankzugriffe
     */
    private FilmRepository filmRepository;

    /**
     * Repository für Favoriten-Datenbankzugriffe
     */
    private FavouriteRepository favouriteRepository;

    @Inject
    public FavouriteService(FilmRepository filmRepository, FavouriteRepository favouriteRepository) {
        this.filmRepository = filmRepository;
        this.favouriteRepository = favouriteRepository;
    }

    /**
     * Gibt alle favourisierten Filme eines Users zurück.
     *
     * @param userId - ID des Users
     * @return favourisierte Filme des Users
     */
    public List<Film> getFavouritesForUser(String userId) {
        List<Film> films = new ArrayList<>();

        List<Favourite> favourites = favouriteRepository.getFavouritesByUserId(UUID.fromString(userId));

        favourites.forEach(favourite -> films.add(favourite.getFilm()));

        return films;
    }

    /**
     * Prüft, ob ein Favourit vorhanden ist, anhand der Film-ID und der User-ID.
     *
     * @param filmId - ID des Filmes
     * @param userId - ID des Users
     * @return True, wenn vorhanden. False, wenn nicht.
     */
    public Boolean checkIfFilmIsFavourite(String filmId, String userId) {
        Favourite favourite = favouriteRepository.getFavouriteById(UUID.fromString(filmId), UUID.fromString(userId));

        if (null != favourite) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Fügt einen neuen Favoriten für einen User hinzu.
     *
     * @param filmId - ID des Films
     * @param userId - ID des Users
     */
    @Transactional
    public void addFilmToUserFavourites(String filmId, String userId) {
        Film film = filmRepository.getFilmById(UUID.fromString(filmId));
        Favourite favourite = new Favourite(UUID.fromString(userId), UUID.fromString(filmId), film);
        favouriteRepository.addFilmToUserFavourites(favourite);
    }

    /**
     * Entfernt einen favourisierten Film eines Users.
     *
     * @param filmId - ID des Filmes
     * @param userId - ID des Users
     */
    @Transactional
    public void removeFilmFromFavourites(String filmId, String userId) {
        Film film = filmRepository.getFilmById(UUID.fromString(filmId));
        Favourite favourite = new Favourite(UUID.fromString(userId), UUID.fromString(filmId), film);
        favouriteRepository.removeFavourite(favourite);
    }
}
