package com.dental.service;

import com.dental.dao.KlinikaDao;
import com.dental.dao.KlinikaDaoImpl;
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
    public Klinika create(Klinika klinika){
        return klinikaDao.create(klinika);
    }



    @Transactional(readOnly = true)
    public List<Klinika> listAll(){
        return klinikaDao.findAll();
    }

    public Klinika findKlinikaByAdresa(String adresa) {
        return klinikaDao.findKlinikaByAdresa(adresa);
    }
}
