package com.udea.concesionario.com.udea.concesionario.service.facade;

import javax.persistence.EntityManager;
import javax.inject.Inject;
import com.udea.concesionario.pojo.Auto;

public class AutoFacade extends AbstractFacade<Auto, Long> {

    @Inject
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public AutoFacade() {
        super(Auto.class);
    }

}
