package com.dental.dao;

import com.dental.models.Prijevoznik;

import java.util.List;

public interface PrijevoznikDao {
    public void deletePrijevoznik(Integer id);
    public List<Prijevoznik> findAll();
    public Prijevoznik findPrijevoznikById(Integer id);
    public Prijevoznik create(Prijevoznik prijevoznik);
}
