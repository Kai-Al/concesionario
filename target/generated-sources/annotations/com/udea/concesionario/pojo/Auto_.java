package com.udea.concesionario.pojo;

import com.udea.concesionario.pojo.Marca;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2022-08-15T17:42:12")
@StaticMetamodel(Auto.class)
public class Auto_ { 

    public static volatile SingularAttribute<Auto, Marca> marca;
    public static volatile SingularAttribute<Auto, Byte> Foto;
    public static volatile SingularAttribute<Auto, String> Modelo;
    public static volatile SingularAttribute<Auto, String> Descripcion;
    public static volatile SingularAttribute<Auto, Long> id;
    public static volatile SingularAttribute<Auto, Double> Precio;

}