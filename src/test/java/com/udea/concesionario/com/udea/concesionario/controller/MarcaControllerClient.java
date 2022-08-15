package com.udea.concesionario.com.udea.concesionario.controller;

import com.udea.concesionario.pojo.Marca;
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
@Path("/api/marca")
public interface MarcaControllerClient {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createMarca(Marca marca);

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateMarca(Marca marca);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Marca> getAllMarcas();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getMarca(@PathParam("id") Long id);

    @DELETE
    @Path("/{id}")
    public Response removeMarca(@PathParam("id") Long id);

}
