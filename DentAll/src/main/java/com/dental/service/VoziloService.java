package com.dental.service;

import com.dental.dao.VoziloDaoImpl;
import com.dental.models.Vozilo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Component
public class VoziloService {
    @Autowired
    private VoziloDaoImpl voziloDao;

    @Transactional
    public void add(Vozilo vozilo){
        voziloDao.create(vozilo);
    }

    @Transactional
    public void addAll(Collection<Vozilo> vozilo){
        for(Vozilo v : vozilo) voziloDao.create(v);
    }

    @Transactional(readOnly = true)
    public List<Vozilo> listAll(){
        return voziloDao.findAll();
    }
}
