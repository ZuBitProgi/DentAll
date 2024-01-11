package com.dental.service;

import com.dental.dao.SmjestajDao;
import com.dental.models.Korisnik;
import com.dental.dao.KorisnikDao;
import com.dental.dao.KorisnikDaoImpl;
import com.dental.models.Putovanje;
import com.dental.models.Smjestaj;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

@Component
public class KorisnikService {

    @Autowired
    private KorisnikDao korisnikDao;

    @Autowired
    private PutovanjeService putovanjeServis;

    @Autowired
    private SmjestajDao smjestajDao;
    @Transactional
    public Korisnik createKorisnik(Korisnik korisnik){
        Assert.notNull(korisnik, "Pogresno unesen korisnik");
        Assert.isNull(korisnik.getId(), "Id mora biti null");
        return korisnikDao.create(korisnik);
    }

    @Transactional
    public List<Korisnik> listAll(){
        return korisnikDao.findAll();
    }

    @Transactional
    public Korisnik findKorisnikById(Integer id){
        return korisnikDao.findKorisnikById(id);
    }

    @Transactional
    public void deleteKorisnik(Integer id){
        korisnikDao.deleteKorisnik(id);
    }

}
