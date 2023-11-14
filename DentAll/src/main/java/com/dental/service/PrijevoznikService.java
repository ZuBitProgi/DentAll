package com.dental.service;

import com.dental.dao.PrijevoznikDao;
import com.dental.models.Prijevoznik;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Component
public class PrijevoznikService {
    @Autowired
    private PrijevoznikDao prijevoznikDao;

    @Transactional
    public void add(Prijevoznik prijevoznik){
        prijevoznikDao.persist(prijevoznik);
    }

    @Transactional
    public void addAll(Collection<Prijevoznik> prijevoznik){
        for(Prijevoznik p : prijevoznik) prijevoznikDao.persist(p);
    }

    @Transactional(readOnly = true)
    public List<Prijevoznik> listAll(){
        return prijevoznikDao.findAll();
    }
}
