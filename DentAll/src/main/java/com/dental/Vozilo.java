package com.dental.vozilo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Vozilo {
    @Id
    private Integer id;
    private String vrsta;
    private String kapacitet;

    public Vozilo(){

    }

    public Vozilo(String vrsta, String kapacitet){
        this.vrsta = vrsta;
        this.kapacitet = kapacitet;
    }

    public Integer getId(){
        return  id;
    }

    public String getVrsta() {
        return vrsta;
    }

    public String getKapacitet() {
        return kapacitet;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setVrsta(String vrsta) {
        this.vrsta = vrsta;
    }

    public void setKapacitet(String kapacitet) {
        this.kapacitet = kapacitet;
    }

}
