package com.dental.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Smjestaj {
    @Id
    @GeneratedValue
    private Integer id;
    private String tip;
    private String kategorija;
    private String adresa;
    private Boolean dostupnost;

    public Smjestaj(){

    };
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="IDKlinika")
    private Klinika klinika;

    @OneToMany(mappedBy = "smjestaj",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Putovanje> putovanja=new ArrayList<>();

    public Smjestaj(String tip, String kategorija, String adresa, Boolean dostupnost){
        this.tip = tip;
        this.kategorija = kategorija;
        this.adresa = adresa;
        this.dostupnost = dostupnost;
    }

    public Integer getId(){
        return  id;
    }

    public String getTip() {
        return tip;
    }

    public String getKategorija() {
        return kategorija;
    }

    public String getAdresa() {
        return adresa;
    }

    public Boolean getDostupnost() {
        return dostupnost;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public void setKategorija(String kategorija) {
        this.kategorija = kategorija;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public void setDostupnost(Boolean dostupnost) {
        this.dostupnost = dostupnost;
    }

    @Override
    public String toString(){
        return "AccomodationEntity{" + "id=" + id + ", tip=" + tip + ", kategorija=" + kategorija + ", adresa=" + adresa + ", dostupnost=" + dostupnost + "}";
    }
}
