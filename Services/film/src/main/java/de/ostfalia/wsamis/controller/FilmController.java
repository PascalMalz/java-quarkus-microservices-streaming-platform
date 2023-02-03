package de.ostfalia.wsamis.controller;

import de.ostfalia.wsamis.businessobject.Film;
import de.ostfalia.wsamis.service.FilmService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.UUID;

/**
 * Controller für alle Film-Requests
 */
@Path("/film")
public class FilmController {

    /**
     * Service für die Fachlogik der Filme.
     */
    @Inject
    private FilmService filmService;

    /**
     * Gibt alle Filme zurück.
     *
     * @return alle Filme
     */
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Film> getAllFilms() {
        return filmService.getAllFilms();
    }

    /**
     * Gibt einen Film anhand der ID zurück.
     *
     * @param filmID - ID des Films
     * @return Film
     */
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Film getFilmById(@PathParam("id") String filmID) {
        return filmService.getFilmById(filmID);
    }

    /**
     * Gibt alle Filme mit passenden Filmtitel zurück.
     *
     * @param filmTitle - Title der Filme
     * @return alle Filme mit passendem Titel
     */
    @GET
    @Path("/title/{title}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Film> getFilmsByTitle(@PathParam("title") String filmTitle) {
        return filmService.getFilmsByTitle(filmTitle);
    }

    /**
     * Gibt alle Film-IDs zurück.
     *
     * @return alle Film-IDs
     */
    @GET
    @Path("/all/ids")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UUID> getAllFilmIds() {
        return filmService.getAllFilmIds();
    }
}
