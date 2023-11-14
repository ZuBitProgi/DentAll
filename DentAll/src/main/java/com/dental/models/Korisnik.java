package com.dental.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Korisnik {
    @Id
    private Integer id;
    private String ime;
    private String prezime;
    private String preference;
    private String kontakt;

    public Korisnik(){

    };

    public Korisnik(String ime, String prezime, String preference, String kontakt){
        this.ime = ime;
        this.prezime = prezime;
        this.preference = preference;
        this.kontakt = kontakt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getPreference() {
        return preference;
    }

    public void setPreference(String preference) {
        this.preference = preference;
    }

    public String getKontakt() {
        return kontakt;
    }

    public void setKontakt(String kontakt) {
        this.kontakt = kontakt;
    }
}
