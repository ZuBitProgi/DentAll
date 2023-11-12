package com.dental.klinika;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class KlinikaDao {
    @PersistenceContext
    private EntityManager em;

    public void persist(Klinika klinika){
        em.persist(klinika);
    }

    public List findAll(){
        return em.createQuery("SELECT k FROM Klinika k").getResultList();
    }
}
