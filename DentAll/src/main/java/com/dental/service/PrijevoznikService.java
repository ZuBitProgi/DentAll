package com.dental.service;

import com.dental.dao.PrijevoznikDao;
import com.dental.dao.PrijevoznikDaoImpl;
import com.dental.models.Klinika;
import com.dental.models.Prijevoznik;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.List;

@Component
public class PrijevoznikService {
    @Autowired
    private PrijevoznikDao prijevoznikDao;

    @Transactional
    public Prijevoznik createPrijevoznik(Prijevoznik prijevoznik){
        Assert.notNull(prijevoznik, "Pogresno unesen prijevoznik");
        Assert.isNull(prijevoznik.getId(), "Id mora biti null");
        return prijevoznikDao.create(prijevoznik);
    }

    @Transactional
    public void deletePrijevoznik(Integer id){
        prijevoznikDao.deletePrijevoznik(id);
    }
    @Transactional(readOnly = true)
    public List<Prijevoznik> listAll(){
        return prijevoznikDao.findAll();
    }
    @Transactional(readOnly = true)
    public Prijevoznik findPrijevoznikById(Integer id){
        return prijevoznikDao.findPrijevoznikById(id);
    }

    public Prijevoznik findPrijevoznikByVozilo(String kapacitet) {
        return prijevoznikDao.findPrijevoznikByVozilo(kapacitet);
    }
}
