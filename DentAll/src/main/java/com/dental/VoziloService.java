package com.dental.vozilo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Component
public class VoziloService {
    @Autowired
    private VoziloDao smjestajDao;

    @Transactional
    public void add(Vozilo vozilo){
        smjestajDao.persist(vozilo);
    }

    @Transactional
    public void addAll(Collection<Vozilo> vozilo){
        for(Vozilo v : vozilo) smjestajDao.persist(v);
    }

    @Transactional(readOnly = true)
    public List<Vozilo> listAll(){
        return smjestajDao.findAll();
    }
}
