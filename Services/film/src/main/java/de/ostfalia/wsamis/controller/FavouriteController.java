package de.ostfalia.wsamis.controller;

import de.ostfalia.wsamis.businessobject.Favourite;
import de.ostfalia.wsamis.businessobject.FavouriteJSON;
import de.ostfalia.wsamis.businessobject.Film;
import de.ostfalia.wsamis.service.FavouriteService;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.*;

/**
 * Controller für alle Requests bezüglich der Favoriten.
 */
@Path("/favourite")
public class FavouriteController {

    /**
     * Service für die Fachlogik der Favoriten.
     */
    @Inject
    private FavouriteService favouriteService;

    /**
     * Gibt alle Favoriten eines Nutzers zurück.
     *
     * @param userId - ID des Users
     * @return alle favourisierten Filme
     */
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Film> getFavourites(@QueryParam("userId") String userId) {
        return favouriteService.getFavouritesForUser(userId);
    }

    /**
     * Prüft, ob ein Film für einen User als Favorit markiert wurde.
     *
     * @param favouriteJSON - Body der Request
     * @return True, wenn favorit. False, wenn nicht
     */
    @POST
    @Path("/check")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Boolean isFilmFavourite(FavouriteJSON favouriteJSON) {
        return favouriteService.checkIfFilmIsFavourite(favouriteJSON.getFilmId(), favouriteJSON.getUserId());
    }

    /**
     * Fügt einen neuen Favoriten für einen Nutzer hinzu.
     *
     * @param favouriteJSON - Body der Request
     * @return - 200 (OK) wenn Favourite hinzugefügt werden konnte, 500 (Error) wenn nicht.
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addFilmToFavourites(FavouriteJSON favouriteJSON) {
        try {
            favouriteService.addFilmToUserFavourites(favouriteJSON.getFilmId(), favouriteJSON.getUserId());
            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeFilmFromFavourites(FavouriteJSON favouriteJSON) {
        try {
            favouriteService.removeFilmFromFavourites(favouriteJSON.getFilmId(), favouriteJSON.getUserId());
            return Response.status(Response.Status.OK).build();
        } catch (Exception exception) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exception.getMessage()).build();
        }
    }
}
