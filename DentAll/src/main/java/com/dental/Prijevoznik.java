package com.dental.prijevoznik;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.sql.Time;

@Entity
public class Prijevoznik {
    @Id
    private Integer id;
    private String kontakt;
    private Time radnoVrijeme;
    private Integer voziloId;

    public Prijevoznik(){

    };

    public Prijevoznik(String kontakt, Time radnoVrijeme, Integer voziloId){
        this.kontakt = kontakt;
        this.radnoVrijeme = radnoVrijeme;
        this.voziloId = voziloId;
    }

    public Integer getId() {
        return id;
    }

    public String getKontakt() {
        return kontakt;
    }

    public Time getRadnoVrijeme() {
        return radnoVrijeme;
    }

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
        this.radnoVrijeme = radnoVrijeme;
    }

    public void setVoziloId(Integer voziloId) {
        this.voziloId = voziloId;
    }
}
