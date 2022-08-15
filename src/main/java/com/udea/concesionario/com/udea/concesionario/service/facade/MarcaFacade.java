package com.udea.concesionario.com.udea.concesionario.service.facade;

import javax.persistence.EntityManager;
import javax.inject.Inject;
import com.udea.concesionario.pojo.Marca;

public class MarcaFacade extends AbstractFacade<Marca, Long> {

    @Inject
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public MarcaFacade() {
        super(Marca.class);
    }

}
