package com.udea.concesionario.com.udea.concesionario.controller;

import com.udea.concesionario.com.udea.concesionario.service.facade.MarcaFacade;
import com.udea.concesionario.pojo.Auto;
import com.udea.concesionario.pojo.Marca;
import static java.util.Collections.singletonMap;
import java.util.List;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import static javax.ws.rs.core.Response.Status.CREATED;
import static javax.ws.rs.core.Response.Status.NOT_FOUND;
import static javax.ws.rs.core.Response.Status.OK;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import static org.hamcrest.CoreMatchers.*;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit.InSequence;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import static org.valid4j.matchers.http.HttpResponseMatchers.hasContentType;
import static org.valid4j.matchers.http.HttpResponseMatchers.hasStatus;

/**
 * Test class for the MarcaController REST controller.
 *
 */
@RunWith(Arquillian.class)
@RunAsClient
public class MarcaControllerTest extends ApplicationTest {

    private static final String DEFAULT_NOMBRE = "A";
    private static final String UPDATED_NOMBRE = "B";
    private static final String DEFAULT_PAIS = "A";
    private static final String UPDATED_PAIS = "B";

    private static Marca marca;

    private MarcaControllerClient client;

    @Deployment
    public static WebArchive createDeployment() {
        return buildApplication()
                .addClasses(
                        Auto.class,
                        Marca.class,
                        MarcaFacade.class,
                        MarcaController.class
                );
    }

    @Before
    public void buildClient() throws Exception {
        client = buildClient(MarcaControllerClient.class);
    }

    @Test
    @InSequence(1)
    public void createMarca() throws Exception {
        int databaseSizeBeforeCreate = client.getAllMarcas().size();

        // Create the Marca
        marca = new Marca();
        marca.setNombre(DEFAULT_NOMBRE);
        marca.setPais(DEFAULT_PAIS);
        Response response = client.createMarca(marca);
        assertThat(response, hasStatus(CREATED));
        marca = response.readEntity(Marca.class);

        // Validate the Marca in the database
        List<Marca> marcas = client.getAllMarcas();
        assertThat(marcas.size(), is(databaseSizeBeforeCreate + 1));
        Marca testMarca = marcas.get(marcas.size() - 1);
        assertThat(testMarca.getNombre(), is(DEFAULT_NOMBRE));
        assertThat(testMarca.getPais(), is(DEFAULT_PAIS));
    }

    @Test
    @InSequence(2)
    public void getAllMarcas() throws Exception {
        // Get all the marcas
        List<Marca> marcas = client.getAllMarcas();
        assertThat(marcas.size(), is(1));
    }

    @Test
    @InSequence(3)
    public void getMarca() throws Exception {
        // Get the marca
        Response response = client.getMarca(marca.getId());
        Marca testMarca = response.readEntity(Marca.class);
        assertThat(response, hasStatus(OK));
        assertThat(response, hasContentType(MediaType.APPLICATION_JSON_TYPE));
        assertThat(testMarca.getId(), is(marca.getId()));
        assertThat(testMarca.getNombre(), is(DEFAULT_NOMBRE));
        assertThat(testMarca.getPais(), is(DEFAULT_PAIS));
    }

    @Test
    @InSequence(4)
    public void getNonExistingMarca() throws Exception {
        // Get the marca
        assertWebException(NOT_FOUND, () -> client.getMarca(3L));
    }

    @Test
    @InSequence(5)
    public void updateMarca() throws Exception {
        // Update the marca
        Marca updatedMarca = new Marca();
        updatedMarca.setId(marca.getId());
        updatedMarca.setNombre(UPDATED_NOMBRE);
        updatedMarca.setPais(UPDATED_PAIS);

        Response response = client.updateMarca(updatedMarca);
        assertThat(response, hasStatus(OK));

        // Validate the Marca in the database
        List<Marca> marcas = client.getAllMarcas();
        Marca testMarca = marcas.get(marcas.size() - 1);
        assertThat(testMarca.getNombre(), is(UPDATED_NOMBRE));
        assertThat(testMarca.getPais(), is(UPDATED_PAIS));
    }

    @Test
    @InSequence(6)
    public void removeMarca() throws Exception {
        int databaseSizeBeforeDelete = client.getAllMarcas().size();

        // Delete the marca
        Response response = client.removeMarca(marca.getId());
        assertThat(response, hasStatus(OK));

        // Validate the database is empty
        List<Marca> marcas = client.getAllMarcas();
        assertThat(marcas.size(), is(databaseSizeBeforeDelete - 1));
    }

}
