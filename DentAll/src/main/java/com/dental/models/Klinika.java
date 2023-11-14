package com.dental.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Klinika {
    @Id
    private Integer id;
    private String adresa;

    public Klinika(){

    };

    public Klinika(String adresa){
        this.adresa = adresa;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }
}
