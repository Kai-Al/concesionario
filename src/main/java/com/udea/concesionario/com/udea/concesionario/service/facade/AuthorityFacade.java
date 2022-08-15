package com.udea.concesionario.com.udea.concesionario.service.facade;

import com.udea.concesionario.pojo.Authority;
import javax.inject.Inject;
import javax.persistence.EntityManager;

public class AuthorityFacade extends AbstractFacade<Authority, String> {

    @Inject
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public AuthorityFacade() {
        super(Authority.class);
    }
}
