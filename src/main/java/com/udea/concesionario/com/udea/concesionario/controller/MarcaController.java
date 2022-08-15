package com.udea.concesionario.com.udea.concesionario.controller;

import com.udea.concesionario.pojo.Marca;
import com.udea.concesionario.com.udea.concesionario.service.facade.MarcaFacade;
import com.udea.concesionario.com.udea.concesionario.controller.util.HeaderUtil;
import static com.udea.concesionario.security.AuthoritiesConstants.USER;
import org.slf4j.Logger;
import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.eclipse.microprofile.metrics.annotation.Timed;
import org.eclipse.microprofile.faulttolerance.Timeout;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

/**
 * REST controller for managing Marca.
 */
@Path("/api/marca")
@RolesAllowed(USER)
public class MarcaController {

    @Inject
    private Logger log;

    @Inject
    private MarcaFacade marcaFacade;

    private static final String ENTITY_NAME = "marca";

    /**
     * POST : Create a new marca.
     *
     * @param marca the marca to create
     * @return the Response with status 201 (Created) and with body the new
     * marca, or with status 400 (Bad Request) if the marca has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @Timed
    @Operation(summary = "create a new marca", description = "Create a new marca")
    @APIResponse(responseCode = "201", description = "Created")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createMarca(Marca marca) throws URISyntaxException {
        log.debug("REST request to save Marca : {}", marca);
        marcaFacade.create(marca);
        return HeaderUtil.createEntityCreationAlert(Response.created(new URI("/resources/api/marca/" + marca.getId())),
                ENTITY_NAME, marca.getId().toString())
                .entity(marca).build();
    }

    /**
     * PUT : Updates an existing marca.
     *
     * @param marca the marca to update
     * @return the Response with status 200 (OK) and with body the updated
     * marca, or with status 400 (Bad Request) if the marca is not valid, or
     * with status 500 (Internal Server Error) if the marca couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @Timed
    @Operation(summary = "update marca", description = "Updates an existing marca")
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateMarca(Marca marca) throws URISyntaxException {
        log.debug("REST request to update Marca : {}", marca);
        marcaFacade.edit(marca);
        return HeaderUtil.createEntityUpdateAlert(Response.ok(), ENTITY_NAME, marca.getId().toString())
                .entity(marca).build();
    }

    /**
     * GET : get all the marcas.
     *
     * @return the Response with status 200 (OK) and the list of marcas in body
     *
     */
    @Timed
    @Operation(summary = "get all the marcas")
    @APIResponse(responseCode = "200", description = "OK")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Timeout
    public List<Marca> getAllMarcas() {
        log.debug("REST request to get all Marcas");
        List<Marca> marcas = marcaFacade.findAll();
        return marcas;
    }

    /**
     * GET /:id : get the "id" marca.
     *
     * @param id the id of the marca to retrieve
     * @return the Response with status 200 (OK) and with body the marca, or
     * with status 404 (Not Found)
     */
    @Timed
    @Operation(summary = "get the marca")
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "404", description = "Not Found")
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMarca(@PathParam("id") Long id) {
        log.debug("REST request to get Marca : {}", id);
        Marca marca = marcaFacade.find(id);
        return Optional.ofNullable(marca)
                .map(result -> Response.status(Response.Status.OK).entity(marca).build())
                .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }

    /**
     * DELETE /:id : remove the "id" marca.
     *
     * @param id the id of the marca to delete
     * @return the Response with status 200 (OK)
     */
    @Timed
    @Operation(summary = "remove the marca")
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "404", description = "Not Found")
    @DELETE
    @Path("/{id}")
    public Response removeMarca(@PathParam("id") Long id) {
        log.debug("REST request to delete Marca : {}", id);
        marcaFacade.remove(marcaFacade.find(id));
        return HeaderUtil.createEntityDeletionAlert(Response.ok(), ENTITY_NAME, id.toString()).build();
    }

}
