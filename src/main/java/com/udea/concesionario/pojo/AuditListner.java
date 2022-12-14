package com.udea.concesionario.pojo;

import com.udea.concesionario.security.SecurityHelper;
import java.time.Instant;
import javax.inject.Inject;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

/**
 * Entity listener class for audit info
 */
public class AuditListner {

    @Inject
    private SecurityHelper securityHelper;

    @PrePersist
    void onCreate(AbstractAuditingEntity entity) {
        entity.setCreatedDate(Instant.now());
        entity.setCreatedBy(securityHelper.getCurrentUserLogin());
    }

    @PreUpdate
    void onUpdate(AbstractAuditingEntity entity) {
        entity.setLastModifiedDate(Instant.now());
        entity.setLastModifiedBy(securityHelper.getCurrentUserLogin());
    }
}
