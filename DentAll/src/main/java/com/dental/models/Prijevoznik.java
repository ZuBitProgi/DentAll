package com.dental.models;

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
    private Time radnoVrijemeOd;
    private Time radnoVrijemeDo;

    private Integer voziloId;

    public Prijevoznik(){

    };
    @OneToMany(mappedBy = "prijevoznik",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Vozilo> vozila=new ArrayList<>();



    @OneToMany(mappedBy = "prijevoznik",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Putovanje> putovanja=new ArrayList<>();

    public Prijevoznik(String kontakt, Time radnoVrijemeOd, Time radnoVrijemeDo, Integer voziloId){
        this.kontakt = kontakt;
        this.radnoVrijemeOd = radnoVrijemeOd;
        this.voziloId = voziloId;
        this.radnoVrijemeDo = radnoVrijemeDo;
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

    public Integer getVoziloId() {
        return voziloId;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setKontakt(String kontakt) {
        this.kontakt = kontakt;
    }

    public void setRadnoVrijeme(Time radnoVrijeme) {
        this.radnoVrijemeOd = radnoVrijemeOd;
    }

    public void setRadnoVrijemeDo(Time radnoVrijemeDo) {this.radnoVrijemeDo = radnoVrijemeDo;}

    public void setVoziloId(Integer voziloId) {
        this.voziloId = voziloId;
    }
}
