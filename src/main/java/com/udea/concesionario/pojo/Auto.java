package com.udea.concesionario.pojo;

import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Entity(name = "Auto")
public class Auto {

    @Id
    @GeneratedValue
    @Column(name = "Id", unique = true, nullable = false)
    @NotNull(message = "Id requerido")
    @PositiveOrZero(message = "Debe ser mayor a cero")
    private Long id;
    @Basic
    @Column(name = "Modelo", nullable = false)
    @NotNull(message = "Modelo requerido")
    private String Modelo;
    @Basic
    @Column(name = "Foto", nullable = false)
    private byte Foto;
    @Basic
    @Column(name = "Precio", nullable = false)
    @NotNull(message = "Precio requerido")
    @PositiveOrZero(message = "Debe ser un valor positivo")
    private double Precio;
    @Basic
    @Column(name = "Descripcion", nullable = false)
    @NotNull(message = "DescripciÃ³n requerida")
    private String Descripcion;
    @ManyToOne
    private Marca marca;

    public Auto(Long id, String Modelo, byte Foto, double Precio, String Descripcion) {
        this.id = id;
        this.Modelo = Modelo;
        this.Foto = Foto;
        this.Precio = Precio;
        this.Descripcion = Descripcion;
    }

    public Auto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModelo() {
        return Modelo;
    }

    public void setModelo(String Modelo) {
        this.Modelo = Modelo;
    }

    public byte getFoto() {
        return Foto;
    }

    public void setFoto(byte Foto) {
        this.Foto = Foto;
    }

    public double getPrecio() {
        return Precio;
    }

    public void setPrecio(double Precio) {
        this.Precio = Precio;
    }

    public String getDescripcion() {
        return Descripcion;
    }

    public void setDescripcion(String Descripcion) {
        this.Descripcion = Descripcion;
    }

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (!Objects.equals(getClass(), obj.getClass())) {
            return false;
        }
        final Auto other = (Auto) obj;
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
        return "Auto{" + " id=" + id + ", Modelo=" + Modelo + ", Foto=" + Foto + ", Precio=" + Precio + ", Descripcion=" + Descripcion + '}';
    }

}