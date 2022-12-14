package com.udea.concesionario.com.udea.concesionario.controller;

import static com.udea.concesionario.com.udea.concesionario.controller.ApplicationTest.USERNAME;
import com.udea.concesionario.com.udea.concesionario.controller.vm.ManagedUserVM;
import static com.udea.concesionario.security.AuthoritiesConstants.USER;
import static java.util.Collections.singleton;
import javax.ws.rs.core.Response;
import static javax.ws.rs.core.Response.Status.BAD_REQUEST;
import static javax.ws.rs.core.Response.Status.CREATED;
import static javax.ws.rs.core.Response.Status.OK;
import static javax.ws.rs.core.Response.Status.NOT_FOUND;
import static javax.ws.rs.core.Response.Status.UNAUTHORIZED;
import static org.hamcrest.CoreMatchers.is;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.arquillian.junit.Arquillian;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import org.junit.Test;
import static org.valid4j.matchers.http.HttpResponseMatchers.hasHeader;
import static org.valid4j.matchers.http.HttpResponseMatchers.hasStatus;
import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import org.junit.Before;

/**
 * Test class for the UserController REST controller.
 *
 */
@RunWith(Arquillian.class)
@RunAsClient
public class UserControllerTest extends ApplicationTest {

    private UserControllerClient client;

    @Deployment
    public static WebArchive createDeployment() {
        return buildApplication()
                .addClass(UserController.class);
    }

    @Before
    public void buildClient() throws Exception {
        client = buildClient(UserControllerClient.class);
    }

    @Test
    public void testCreateUser() throws Exception {
        ManagedUserVM validUser = new ManagedUserVM(
                null, // id
                "joe", // login
                "password", // password
                "Joe", // firstName
                "Shmoe", // lastName
                "joe@example.com", // e-mail
                true, // activated
                "en", // langKey
                null, // createdBy
                null, // createdDate
                null, // lastModifiedBy
                null, // lastModifiedDate
                singleton(USER) // authorities
        );

        Response response = client.createUser(validUser);
        assertThat(response, hasStatus(CREATED));

        response = client.getUser("joe");
        assertThat(response, hasStatus(OK));
    }

    @Test
    public void testCreateUserDuplicateLogin() throws Exception {
        // Good
        ManagedUserVM validUser = new ManagedUserVM(
                null, // id
                "alice", // login
                "password", // password
                "Alice", // firstName
                "Something", // lastName
                "alice@example.com", // e-mail
                true, // activated
                "en", // langKey
                null, // createdBy
                null, // createdDate
                null, // lastModifiedBy
                null, // lastModifiedDate
                singleton(USER) // authorities
        );

        // Duplicate login, different e-mail
        ManagedUserVM duplicatedUser = new ManagedUserVM(
                validUser.getId(),
                validUser.getLogin(),
                validUser.getPassword(),
                validUser.getFirstName(),
                validUser.getLastName(),
                "alicejr@example.com",
                validUser.isActivated(),
                validUser.getLangKey(),
                validUser.getCreatedBy(),
                validUser.getCreatedDate(),
                validUser.getLastModifiedBy(),
                validUser.getLastModifiedDate(),
                validUser.getAuthorities()
        );

        // Good user
        Response response = client.createUser(validUser);
        assertThat(response, hasStatus(CREATED));

        // Duplicate login
        assertWebException(BAD_REQUEST, () -> client.createUser(duplicatedUser));

        testExistingUser("alice", "alice@example.com");
    }

    @Test
    public void testCreateUserDuplicateEmail() throws Exception {
        // Good
        ManagedUserVM validUser = new ManagedUserVM(
                null, // id
                "john", // login
                "password", // password
                "John", // firstName
                "Doe", // lastName
                "john@example.com", // e-mail
                true, // activated
                "en", // langKey
                null, // createdBy
                null, // createdDate
                null, // lastModifiedBy
                null, // lastModifiedDate
                singleton(USER) // authorities
        );

        // Duplicate e-mail, different login
        ManagedUserVM duplicatedUser = new ManagedUserVM(
                validUser.getId(),
                "johnjr",
                validUser.getPassword(),
                validUser.getFirstName(),
                validUser.getLastName(),
                validUser.getEmail(),
                validUser.isActivated(),
                validUser.getLangKey(),
                validUser.getCreatedBy(),
                validUser.getCreatedDate(),
                validUser.getLastModifiedBy(),
                validUser.getLastModifiedDate(),
                validUser.getAuthorities()
        );

        // Good user
        Response response = client.createUser(validUser);
        assertThat(response, hasStatus(CREATED));

        // Duplicate  e-mail
        assertWebException(BAD_REQUEST, () -> client.createUser(duplicatedUser));

        testExistingUser("john", "john@example.com");
    }

    @Test
    public void testGetExistingUser() throws Exception {
        testExistingUser("admin", "admin@example.com");
    }

    @Test
    public void testGetAllUser() throws Exception {
        Response response = client.getAllUsers(0, 5);
        assertThat(response, hasStatus(OK));
    }

    @Test
    public void testGetUnknownUser() throws Exception {
        assertWebException(NOT_FOUND, () -> client.getUser("unknown"));
    }

    @Test
    public void testUpdateUser() throws Exception {
        Response response = client.getUser("user");
        assertThat(response, hasStatus(OK));
        ManagedUserVM user = response.readEntity(ManagedUserVM.class);
        user.setLastName("Gupta");

        response = client.updateUser(user);
        assertThat(response, hasStatus(OK));
    }

    @Test
    public void testDeleteUser() throws Exception {
        Response response = client.deleteUser("user");
        assertThat(response, hasStatus(OK));
    }

    @Test
    public void testValidLogin() throws Exception {
        Response response = login(USERNAME, PASSWORD);
        assertThat(response, hasStatus(OK));
        assertThat(response, hasHeader(AUTHORIZATION));
        String token = response.getHeaderString(AUTHORIZATION);
        assertNotNull(token);
    }

    @Test
    public void testInvalidLogin() throws Exception {
        assertWebException(UNAUTHORIZED, () -> login(USERNAME, INVALID_PASSWORD));
    }

    private void testExistingUser(String id, String email) throws Exception {
        Response response = client.getUser(id);
        assertThat(response, hasStatus(OK));
        ManagedUserVM user = response.readEntity(ManagedUserVM.class);
        assertThat(user.getEmail(), is(email));
    }

}
