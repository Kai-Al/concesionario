package com.udea.concesionario.com.udea.concesionario.controller;

import com.udea.concesionario.pojo.Auto;
import com.udea.concesionario.com.udea.concesionario.service.facade.AutoFacade;
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
 * REST controller for managing Auto.
 */
@Path("/api/auto")
@RolesAllowed(USER)
public class AutoController {

    @Inject
    private Logger log;

    @Inject
    private AutoFacade autoFacade;

    private static final String ENTITY_NAME = "auto";

    /**
     * POST : Create a new auto.
     *
     * @param auto the auto to create
     * @return the Response with status 201 (Created) and with body the new
     * auto, or with status 400 (Bad Request) if the auto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @Timed
    @Operation(summary = "create a new auto", description = "Create a new auto")
    @APIResponse(responseCode = "201", description = "Created")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAuto(Auto auto) throws URISyntaxException {
        log.debug("REST request to save Auto : {}", auto);
        autoFacade.create(auto);
        return HeaderUtil.createEntityCreationAlert(Response.created(new URI("/resources/api/auto/" + auto.getId())),
                ENTITY_NAME, auto.getId().toString())
                .entity(auto).build();
    }

    /**
     * PUT : Updates an existing auto.
     *
     * @param auto the auto to update
     * @return the Response with status 200 (OK) and with body the updated auto,
     * or with status 400 (Bad Request) if the auto is not valid, or with status
     * 500 (Internal Server Error) if the auto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @Timed
    @Operation(summary = "update auto", description = "Updates an existing auto")
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAuto(Auto auto) throws URISyntaxException {
        log.debug("REST request to update Auto : {}", auto);
        autoFacade.edit(auto);
        return HeaderUtil.createEntityUpdateAlert(Response.ok(), ENTITY_NAME, auto.getId().toString())
                .entity(auto).build();
    }

    /**
     * GET : get all the autoes.
     *
     * @return the Response with status 200 (OK) and the list of autoes in body
     *
     */
    @Timed
    @Operation(summary = "get all the autoes")
    @APIResponse(responseCode = "200", description = "OK")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Timeout
    public List<Auto> getAllAutoes() {
        log.debug("REST request to get all Autoes");
        List<Auto> autoes = autoFacade.findAll();
        return autoes;
    }

    /**
     * GET /:id : get the "id" auto.
     *
     * @param id the id of the auto to retrieve
     * @return the Response with status 200 (OK) and with body the auto, or with
     * status 404 (Not Found)
     */
    @Timed
    @Operation(summary = "get the auto")
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "404", description = "Not Found")
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAuto(@PathParam("id") Long id) {
        log.debug("REST request to get Auto : {}", id);
        Auto auto = autoFacade.find(id);
        return Optional.ofNullable(auto)
                .map(result -> Response.status(Response.Status.OK).entity(auto).build())
                .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }

    /**
     * DELETE /:id : remove the "id" auto.
     *
     * @param id the id of the auto to delete
     * @return the Response with status 200 (OK)
     */
    @Timed
    @Operation(summary = "remove the auto")
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "404", description = "Not Found")
    @DELETE
    @Path("/{id}")
    public Response removeAuto(@PathParam("id") Long id) {
        log.debug("REST request to delete Auto : {}", id);
        autoFacade.remove(autoFacade.find(id));
        return HeaderUtil.createEntityDeletionAlert(Response.ok(), ENTITY_NAME, id.toString()).build();
    }

}
