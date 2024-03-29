package com.dental.models;

import jakarta.persistence.*;

import java.sql.Time;

@Entity
public class Putovanje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Time vrijeme;
    private Integer klinikaId;
    private Integer prijevoznikId;
    private Integer smjestajId;
    private Integer korisnikId;
    private String smjer;

    public Putovanje(){

    };
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="IDPrijevoznik")
    private Prijevoznik prijevoznik;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="IDKorisnik")
    private Korisnik korisnik;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="IDKlinika")
    private Klinika klinika;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="IDSmjestaj")
    private Smjestaj smjestaj;

    public Putovanje(Time vrijeme, Integer klinika, Integer prijevoznik, Integer smjestaj, Integer korisnik, String smjer){
        this.vrijeme = vrijeme;
        this.klinikaId = klinika;
        this.prijevoznikId = prijevoznik;
        this.smjestajId = smjestaj;
        this.korisnikId = korisnik;
        this.smjer = smjer;
    }

    public Integer getId(){
        return  id;
    }

    public Time getVrijeme() {
        return vrijeme;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setVrijeme(Time vrijeme) {
        this.vrijeme = vrijeme;
    }

    public Integer getKlinikaId() {
        return klinikaId;
    }

    public void setKlinikaId(Integer klinikaId) {
        this.klinikaId = klinikaId;
    }

    public Integer getPrijevoznikId() {
        return prijevoznikId;
    }

    public void setPrijevoznikId(Integer prijevoznikId) {
        this.prijevoznikId = prijevoznikId;
    }

    public Integer getSmjestajId() {
        return smjestajId;
    }

    public void setSmjestajId(Integer smjestajId) {
        this.smjestajId = smjestajId;
    }

    public Integer getKorisnikId() {
        return korisnikId;
    }

    public void setKorisnikId(Integer korisnikId) {
        this.korisnikId = korisnikId;
    }

    public String getSmjer() {
        return smjer;
    }

    public void setSmjer(String smjer) {
        this.smjer = smjer;
    }
}
