package com.dental.korisnik;

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

    public List findAll(){
        return em.createQuery("SELECT k FROM Korisnik k").getResultList();
    }
}
