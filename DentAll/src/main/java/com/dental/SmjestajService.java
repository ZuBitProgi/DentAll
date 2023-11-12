package com.dental.smjestaj;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Component
public class SmjestajService {
    @Autowired
    private SmjestajDao smjestajDao;

    @Transactional
    public void add(Smjestaj smjestaj){
        smjestajDao.persist(smjestaj);
    }

    @Transactional
    public void addAll(Collection<Smjestaj> smjestaj){
        for(Smjestaj s : smjestaj) smjestajDao.persist(s);
    }

    @Transactional(readOnly = true)
    public List<Smjestaj> listAll(){
        return smjestajDao.findAll();
    }
}
