package de.ostfalia.amis.rating.controller;

import de.ostfalia.amis.rating.model.AddRatingJSON;
import de.ostfalia.amis.rating.service.RatingService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/rating")
public class RatingController {

    @Inject
    private RatingService ratingService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public double getRatingForFilm(@QueryParam("filmId") String filmId) {
        return ratingService.getRatingForFilm(filmId);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addRatingToFilm(AddRatingJSON addRatingJSON) {

        try {
            ratingService.addRatingToFilm(addRatingJSON.getFilmId(), addRatingJSON.getUserId(),
                    addRatingJSON.getValue());
            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }

    }
}
