package de.ostfalia.wsamis.controller;

import de.ostfalia.wsamis.businessobject.UserJSON;
import de.ostfalia.wsamis.service.UserService;
import de.ostfalia.wsamis.service.UserValidationService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.UUID;

@Path("/login")
public class LoginController {

    @Inject
    UserValidationService userValidationService;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public UUID userValidation(UserJSON userJSON) {
    return userValidationService.userValidation(userJSON.getEmail(), userJSON.getPassword());
}



}
