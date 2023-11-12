package com.dental.smjestaj;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Smjestaj {
    @Id
    private Integer id;
    private String tip;
    private String kategorija;
    private String adresa;
    private Boolean dostupnost;

    public Smjestaj(){

    };

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
}
