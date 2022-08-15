package com.udea.concesionario.com.udea.concesionario.controller;

import com.udea.concesionario.com.udea.concesionario.service.facade.AutoFacade;
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
 * Test class for the AutoController REST controller.
 *
 */
@RunWith(Arquillian.class)
@RunAsClient
public class AutoControllerTest extends ApplicationTest {

    private static final String DEFAULT_MODELO = "A";
    private static final String UPDATED_MODELO = "B";
    private static final byte DEFAULT_FOTO = 1;
    private static final byte UPDATED_FOTO = 2;
    private static final String DEFAULT_DESCRIPCION = "A";
    private static final String UPDATED_DESCRIPCION = "B";

    private static Auto auto;

    private AutoControllerClient client;

    @Deployment
    public static WebArchive createDeployment() {
        return buildApplication()
                .addClasses(
                        Auto.class,
                        Marca.class,
                        AutoFacade.class,
                        AutoController.class
                );
    }

    @Before
    public void buildClient() throws Exception {
        client = buildClient(AutoControllerClient.class);
    }

    @Test
    @InSequence(1)
    public void createAuto() throws Exception {
        int databaseSizeBeforeCreate = client.getAllAutoes().size();

        // Create the Auto
        auto = new Auto();
        auto.setModelo(DEFAULT_MODELO);
        auto.setFoto(DEFAULT_FOTO);
        auto.setDescripcion(DEFAULT_DESCRIPCION);
        Response response = client.createAuto(auto);
        assertThat(response, hasStatus(CREATED));
        auto = response.readEntity(Auto.class);

        // Validate the Auto in the database
        List<Auto> autoes = client.getAllAutoes();
        assertThat(autoes.size(), is(databaseSizeBeforeCreate + 1));
        Auto testAuto = autoes.get(autoes.size() - 1);
        assertThat(testAuto.getModelo(), is(DEFAULT_MODELO));
        assertThat(testAuto.getFoto(), is(DEFAULT_FOTO));
        assertThat(testAuto.getDescripcion(), is(DEFAULT_DESCRIPCION));
    }

    @Test
    @InSequence(2)
    public void getAllAutoes() throws Exception {
        // Get all the autoes
        List<Auto> autoes = client.getAllAutoes();
        assertThat(autoes.size(), is(1));
    }

    @Test
    @InSequence(3)
    public void getAuto() throws Exception {
        // Get the auto
        Response response = client.getAuto(auto.getId());
        Auto testAuto = response.readEntity(Auto.class);
        assertThat(response, hasStatus(OK));
        assertThat(response, hasContentType(MediaType.APPLICATION_JSON_TYPE));
        assertThat(testAuto.getId(), is(auto.getId()));
        assertThat(testAuto.getModelo(), is(DEFAULT_MODELO));
        assertThat(testAuto.getFoto(), is(DEFAULT_FOTO));
        assertThat(testAuto.getDescripcion(), is(DEFAULT_DESCRIPCION));
    }

    @Test
    @InSequence(4)
    public void getNonExistingAuto() throws Exception {
        // Get the auto
        assertWebException(NOT_FOUND, () -> client.getAuto(3L));
    }

    @Test
    @InSequence(5)
    public void updateAuto() throws Exception {
        // Update the auto
        Auto updatedAuto = new Auto();
        updatedAuto.setId(auto.getId());
        updatedAuto.setModelo(UPDATED_MODELO);
        updatedAuto.setFoto(UPDATED_FOTO);
        updatedAuto.setDescripcion(UPDATED_DESCRIPCION);

        Response response = client.updateAuto(updatedAuto);
        assertThat(response, hasStatus(OK));

        // Validate the Auto in the database
        List<Auto> autoes = client.getAllAutoes();
        Auto testAuto = autoes.get(autoes.size() - 1);
        assertThat(testAuto.getModelo(), is(UPDATED_MODELO));
        assertThat(testAuto.getFoto(), is(UPDATED_FOTO));
        assertThat(testAuto.getDescripcion(), is(UPDATED_DESCRIPCION));
    }

    @Test
    @InSequence(6)
    public void removeAuto() throws Exception {
        int databaseSizeBeforeDelete = client.getAllAutoes().size();

        // Delete the auto
        Response response = client.removeAuto(auto.getId());
        assertThat(response, hasStatus(OK));

        // Validate the database is empty
        List<Auto> autoes = client.getAllAutoes();
        assertThat(autoes.size(), is(databaseSizeBeforeDelete - 1));
    }

}
