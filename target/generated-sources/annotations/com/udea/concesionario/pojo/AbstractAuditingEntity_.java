package com.udea.concesionario.pojo;

import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2022-08-15T17:42:12")
@StaticMetamodel(AbstractAuditingEntity.class)
public abstract class AbstractAuditingEntity_ { 

    public static volatile SingularAttribute<AbstractAuditingEntity, Instant> createdDate;
    public static volatile SingularAttribute<AbstractAuditingEntity, String> createdBy;
    public static volatile SingularAttribute<AbstractAuditingEntity, Instant> lastModifiedDate;
    public static volatile SingularAttribute<AbstractAuditingEntity, String> lastModifiedBy;

}