package com.dental.dao;

import com.dental.models.Korisnik;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class KorisnikDao {
    @PersistenceContext
    private EntityManager em;

    public void persist(Korisnik korisnik){
        em.persist(korisnik);
    }

    public List<Korisnik> findAll(){
        return em.createQuery("SELECT k FROM Korisnik k").getResultList();
    }
}
