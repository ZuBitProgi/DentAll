package com.dental.dao;

import com.dental.models.Smjestaj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


public interface SmjestajDao {

    List<Smjestaj> findAll();

    Smjestaj findSmjestajById(Integer id);

    Smjestaj findSmjestajByAdresa(String adresa);

    Smjestaj findSmjestajByKategorijaTipDostupnost(String kategorija, String tip, Boolean dostupnost);
    Smjestaj create(Smjestaj smjestaj);

    void update(Smjestaj smjestaj);

    void deleteSmjestaj(Integer id);
}
