package com.dental.dao;

import com.dental.models.Vozilo;

import java.util.List;

public interface VoziloDao {
    public List<Vozilo> findAll();
    public List<Vozilo> findByKapacitet(String kapacitet);
}
