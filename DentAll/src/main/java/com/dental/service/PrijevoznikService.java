package com.dental.service;

import com.dental.dao.PrijevoznikDao;
import com.dental.models.Prijevoznik;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class PrijevoznikService {
    @Autowired
    private PrijevoznikDao prijevoznikDao;

    @Transactional
    public Prijevoznik createPrijevoznik(Prijevoznik prijevoznik){
        return prijevoznikDao.persist(prijevoznik);
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
}
