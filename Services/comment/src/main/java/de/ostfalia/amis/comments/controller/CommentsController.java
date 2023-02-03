package de.ostfalia.amis.comments.controller;

import de.ostfalia.amis.comments.model.AddCommentJSON;
import de.ostfalia.amis.comments.model.Comment;
import de.ostfalia.amis.comments.service.CommentsService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.UUID;

@Path("/comments")
public class CommentsController {

    @Inject
    private CommentsService commentsService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Comment> getCommentsByFilmId(@QueryParam("filmId") String filmId) {
        return commentsService.getCommentsByFilm(filmId);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveComment(AddCommentJSON addCommentJSON) {

        try {
            commentsService.saveComment(addCommentJSON.getFilmId(), addCommentJSON.getUserId(), addCommentJSON.getText());
            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }


    }

        /**
     * Gibt einen Kommentar anhand der ID zurück.
     *
     * @param filmID - ID des Films
     * @return text
     */
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Comment getCommentByFilmId(@PathParam("id") String filmID) {
        return commentsService.getCommentByFilmId(filmID);
    }
}
