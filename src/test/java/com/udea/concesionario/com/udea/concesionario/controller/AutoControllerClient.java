package com.udea.concesionario.com.udea.concesionario.controller;

import com.udea.concesionario.pojo.Auto;
import javax.ws.rs.PathParam;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient
@Path("/api/auto")
public interface AutoControllerClient {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAuto(Auto auto);

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAuto(Auto auto);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Auto> getAllAutoes();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getAuto(@PathParam("id") Long id);

    @DELETE
    @Path("/{id}")
    public Response removeAuto(@PathParam("id") Long id);

}
