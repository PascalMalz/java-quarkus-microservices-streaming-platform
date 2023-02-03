package de.ostfalia.wsamis.service;

import de.ostfalia.wsamis.businessobject.Film;
import de.ostfalia.wsamis.repository.FilmRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.UUID;

/**
 * Service für die Fachlogik bezüglich der Filme.
 */
@ApplicationScoped
public class FilmService {

    /**
     * Repository für die Film-Datenbankzugriffe
     */
    private FilmRepository filmRepository;

    @Inject
    public FilmService(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    /**
     * Gibt alle Filme zurück.
     *
     * @return alle Filme
     */
    public List<Film> getAllFilms() {
        return filmRepository.getAllFilms();
    }

    /**
     * Gibt einen Kommentar anhand der Film-ID zurück.
     *
     * @param filmId - ID des Films
     * @return Kommentar
     */
    public Film getFilmById(String filmId) {
        return filmRepository.getFilmById(UUID.fromString(filmId));
    }

    /**
     * Ermittelt alle Filme mit passendem Titel.
     *
     * @param filmTitle - Titel des Filmes
     * @return alle Filme mit passendem Titel
     */
    public List<Film> getFilmsByTitle(String filmTitle) {
        return filmRepository.getFilmsByTitle(filmTitle);
    }

    /**
     * Gibt alle Film-IDs zurück.
     *
     * @return alle Film-IDs
     */
    public List<UUID> getAllFilmIds() {
        return filmRepository.getAllFilmIds();
    }
}
