package com.dental.service;

import com.dental.dao.SmjestajDao;
import com.dental.models.Smjestaj;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class SmjestajService {

    @Autowired
    private SmjestajDao smjestajDao;

    @Transactional(readOnly = true)
    public List<Smjestaj> listAll(){
        return smjestajDao.findAll();
    }

    @Transactional(readOnly = true)
    public Smjestaj findSmjestajById(Integer id){
        return smjestajDao.findSmjestajById(id);
    }

    @Transactional
    public Smjestaj createSmjestaj(Smjestaj smjestaj){
        Assert.notNull(smjestaj, "Pogresno unesen smjestaj");
        Assert.isNull(smjestaj.getId(), "Id mora biti null");
        return smjestajDao.create(smjestaj);
    }

    @Transactional
    public void deleteSmjestaj(Integer id){
        smjestajDao.deleteSmjestaj(id);
    }
}
