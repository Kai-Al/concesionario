package com.udea.concesionario.com.udea.concesionario.controller;

import static com.udea.concesionario.security.AuthoritiesConstants.ADMIN;
import static com.udea.concesionario.security.AuthoritiesConstants.USER;
import javax.annotation.security.DeclareRoles;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import org.eclipse.microprofile.auth.LoginConfig;

@LoginConfig(
        authMethod = "MP-JWT",
        realmName = "MP-JWT"
)
@DeclareRoles({ADMIN, USER})
@ApplicationPath("resources")
public class ApplicationConfig extends Application {
}
