package com.dental.dao;

import com.dental.models.Klinika;
import com.dental.models.Korisnik;

import java.util.List;

public interface KlinikaDao {
    List<Klinika> findAll();

    Klinika findKlinikaById(Integer id);

   Klinika create(Klinika Klinika);

    void deleteKlinika(Integer id);

    public Klinika findKlinikaByAdresa(String adresa);
}
