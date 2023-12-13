package com.dental.service;

import com.dental.models.Smjestaj;

import java.util.List;

public interface SmjestajService {
    List<Smjestaj> listAll();

    Smjestaj createSmjestaj(Smjestaj smjestaj);

    List<Smjestaj> findSmjestajById(Integer id);

    void deleteSmjestaj(Integer id);
}
