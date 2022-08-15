package com.udea.concesionario.pojo;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity(name = "Marca")
public class Marca {

    @Id
    @GeneratedValue
    @Column(name = "Id", nullable = false)
    @NotNull(message = "Id requerido")
    private Long id;
    @Basic
    @Column(name = "Nombre", nullable = false)
    @NotNull(message = "Nombre requerido")
    private String Nombre;
    @Basic
    @Column(name = "Pais", nullable = false)
    @NotNull(message = "Pais requerido")
    private String Pais;
    @OneToMany(mappedBy = "marca")
    private List<Auto> autos;

    public Marca() {
    }

    public Marca(Long id, String Nombre, String Pais) {
        this.id = id;
        this.Nombre = Nombre;
        this.Pais = Pais;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

    public String getPais() {
        return Pais;
    }

    public void setPais(String Pais) {
        this.Pais = Pais;
    }

    public List<Auto> getAutos() {
        if (autos == null) {
            autos = new ArrayList<>();
        }
        return autos;
    }

    public void setAutos(List<Auto> autos) {
        this.autos = autos;
    }

    public void addAuto(Auto auto) {
        getAutos().add(auto);
        auto.setMarca(this);
    }

    public void removeAuto(Auto auto) {
        getAutos().remove(auto);
        auto.setMarca(null);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (!Objects.equals(getClass(), obj.getClass())) {
            return false;
        }
        final Marca other = (Marca) obj;
        if (!java.util.Objects.equals(this.getId(), other.getId())) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 31 * hash + Objects.hashCode(this.getId());
        return hash;
    }

    @Override
    public String toString() {
        return "Marca{" + " id=" + id + ", Nombre=" + Nombre + ", Pais=" + Pais + '}';
    }

}