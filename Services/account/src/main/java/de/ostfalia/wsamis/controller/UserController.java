package de.ostfalia.wsamis.controller;

import de.ostfalia.wsamis.businessobject.UserJSON;
import de.ostfalia.wsamis.service.UserService;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;




@Path("/registration")
public class UserController {

    @Inject
    UserService userService;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(UserJSON userJSON){
        try {
            userService.addUser (userJSON.getEmail(), userJSON.getPassword());
            return Response.status(Response.Status.OK).build();
        }catch (Exception e)
        {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }



}


