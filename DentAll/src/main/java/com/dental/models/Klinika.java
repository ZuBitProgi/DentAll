package com.dental.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Klinika {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String adresa;

    public Klinika(){

    };
    @OneToMany(mappedBy = "klinika",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Smjestaj> smjestaji= new ArrayList<>();

    @OneToMany(mappedBy = "klinika",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Smjestaj> putovanja= new ArrayList<>();
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
