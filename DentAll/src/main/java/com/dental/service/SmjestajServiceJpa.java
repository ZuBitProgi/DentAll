package com.dental.service;

import com.dental.dao.SmjestajDao;
import com.dental.models.Smjestaj;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class SmjestajServiceJpa implements SmjestajService {

    @Autowired
    private SmjestajDao smjestajRepo;

    @Override
    public List<Smjestaj> listAll(){
        return smjestajRepo.findAll();
    }

    @Override
    public List<Smjestaj> findSmjestajById(Integer id){
        return smjestajRepo.findAllById(id);
    }

    @Override
    public Smjestaj createSmjestaj(Smjestaj smjestaj){
        Assert.notNull(smjestaj, "Ne postoji smjestaj");
        Assert.isNull(smjestaj.getId(), "Id mora biti null");
        return smjestajRepo.save(smjestaj);
    }

    @Override
    public void deleteSmjestaj(Integer id){
        smjestajRepo.deleteById(id);
    }
}
