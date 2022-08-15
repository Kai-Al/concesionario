package com.udea.concesionario.com.udea.concesionario.controller;

import com.udea.concesionario.com.udea.concesionario.controller.vm.KeyAndPasswordVM;
import com.udea.concesionario.com.udea.concesionario.controller.vm.ManagedUserVM;
import com.udea.concesionario.com.udea.concesionario.controller.vm.PasswordChangeVM;
import com.udea.concesionario.service.dto.UserDTO;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient
@Path("/api")
public interface AccountControllerClient {

    @Path("/register")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})
    public Response registerAccount(ManagedUserVM managedUserVM);

    @Path("/activate")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response activateAccount(@QueryParam("key") String key);

    @Path("/authenticate")
    @GET
    @Produces({MediaType.TEXT_PLAIN})
    public String isAuthenticated();

    @Path("/account")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAccount();

    @Path("/account")
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response saveAccount(UserDTO userDTO);

    @Path("/account/change-password")
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
    public Response changePassword(PasswordChangeVM passwordChangeVM);

    @Path("/account/reset-password/init")
    @POST
    @Produces({MediaType.APPLICATION_JSON})
    public Response requestPasswordReset(String mail);

    @Path("/account/reset-password/finish")
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
    public Response finishPasswordReset(KeyAndPasswordVM keyAndPassword);

}
