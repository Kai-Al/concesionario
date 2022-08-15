package com.udea.concesionario.pojo;

import com.udea.concesionario.pojo.Auto;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2022-08-15T17:42:12")
@StaticMetamodel(Marca.class)
public class Marca_ { 

    public static volatile SingularAttribute<Marca, String> Nombre;
    public static volatile ListAttribute<Marca, Auto> autos;
    public static volatile SingularAttribute<Marca, Long> id;
    public static volatile SingularAttribute<Marca, String> Pais;

}