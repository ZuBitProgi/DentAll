package com.dental.service;

import com.dental.dao.KlinikaDao;
import com.dental.models.Klinika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Component
public class KlinikaService {
    @Autowired
    private KlinikaDao klinikaDao;

    @Transactional
    public void add(Klinika klinika){
        klinikaDao.persist(klinika);
    }

    @Transactional
    public void addAll(Collection<Klinika> klinika){
        for(Klinika k : klinika) klinikaDao.persist(k);
    }

    @Transactional(readOnly = true)
    public List<Klinika> listAll(){
        return klinikaDao.findAll();
    }
}
