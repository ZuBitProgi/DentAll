package com.dental.dao;

import com.dental.models.Korisnik;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class KorisnikDaoImpl implements KorisnikDao{

    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional(readOnly = true)
    public List<Korisnik> findAll(){
        return em.createQuery("SELECT k FROM Korisnik k", Korisnik.class)
                .getResultList();
    }

    @Override
    @Transactional(readOnly = true)
    public Korisnik findKorisnikById(Integer id){
        return em.createQuery("SELECT k FROM Korisnik k WHERE k.id = :id", Korisnik.class)
                .setParameter("id", id).getSingleResult();
    }

    @Override
    @Transactional
    public Korisnik create(Korisnik korisnik){
        em.persist(korisnik);
        return korisnik;
    }

    @Override
    @Transactional
    public void deleteKorisnik(Integer id){
        Korisnik entityToRemove = em.find(Korisnik.class, id);
        if(entityToRemove != null) em.remove(entityToRemove);
    }
}
