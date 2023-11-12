package com.dental.korisnik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Component
public class KorisnikService {
    @Autowired
    private KorisnikDao korisnikDao;

    @Transactional
    public void add(Korisnik korisnik){
        korisnikDao.persist(korisnik);
    }

    @Transactional
    public void addAll(Collection<Korisnik> korisnik){
        for(Korisnik k : korisnik) korisnikDao.persist(k);
    }

    @Transactional(readOnly = true)
    public List<Korisnik> listAll(){
        return korisnikDao.findAll();
    }
}
