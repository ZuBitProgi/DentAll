package com.dental.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Prijevoznik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String kontakt;
    @JsonFormat(pattern = "HH:mm")
    private Time radnoVrijemeOd;
    @JsonFormat(pattern = "HH:mm")
    private Time radnoVrijemeDo;

    private String vrsta;
    private Integer kapacitet;
    private String model;
    public Prijevoznik(){

    };

    @OneToMany(mappedBy = "prijevoznik",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Putovanje> putovanja=new ArrayList<>();

    public Prijevoznik(Integer id, String kontakt, Time radnoVrijemeOd, Time radnoVrijemeDo, String vrsta, Integer kapacitet, String model) {
        this.id = id;
        this.kontakt = kontakt;
        this.radnoVrijemeOd = radnoVrijemeOd;
        this.radnoVrijemeDo = radnoVrijemeDo;
        this.vrsta = vrsta;
        this.kapacitet = kapacitet;
        this.model = model;
    }

    public Integer getId() {
        return id;
    }

    public String getKontakt() {
        return kontakt;
    }

    public Time getRadnoVrijemeOd() {
        return radnoVrijemeOd;
    }

    public Time getRadnoVrijemeDo() {return radnoVrijemeDo;}

    public void setId(Integer id) {
        this.id = id;
    }

    public void setKontakt(String kontakt) {
        this.kontakt = kontakt;
    }

    public void setRadnoVrijemeOd(Time radnoVrijemeOd) {
        this.radnoVrijemeOd = radnoVrijemeOd;
    }

    public void setRadnoVrijemeDo(Time radnoVrijemeDo) {this.radnoVrijemeDo = radnoVrijemeDo;}

    public String getVrsta() {
        return vrsta;
    }

    public void setVrsta(String vrsta) {
        this.vrsta = vrsta;
    }

    public Integer getKapacitet() {
        return kapacitet;
    }

    public void setKapacitet(Integer kapacitet) {
        this.kapacitet = kapacitet;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<Putovanje> getPutovanja() {
        return putovanja;
    }

    public void setPutovanja(List<Putovanje> putovanja) {
        this.putovanja = putovanja;
    }
}
