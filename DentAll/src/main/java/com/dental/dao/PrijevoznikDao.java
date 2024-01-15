package com.dental.dao;

import com.dental.models.Prijevoznik;

import java.util.List;

public interface PrijevoznikDao {
     void deletePrijevoznik(Integer id);
     void updatePrijevoznik(Prijevoznik prijevoznik);
     List<Prijevoznik> findAll();
     Prijevoznik findPrijevoznikById(Integer id);

     Prijevoznik findPrijevoznikByVozilo(String kapacitet);
     Prijevoznik create(Prijevoznik prijevoznik);
}
