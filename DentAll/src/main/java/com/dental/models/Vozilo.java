package com.dental.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Vozilo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String vrsta;
    private String kapacitet;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="IDPrijevoznik")
    private Prijevoznik prijevoznik;



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
