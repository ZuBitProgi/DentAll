package com.dental.smjestaj;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SmjestajDao {
    @PersistenceContext
    private EntityManager em;

    public void persist(Smjestaj smjestaj){
        em.persist(smjestaj);
    }

    public List findAll(){
        return em.createQuery("SELECT  s FROM Smjestaj s").getResultList();
    }
}
