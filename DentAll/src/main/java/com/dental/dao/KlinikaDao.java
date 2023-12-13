package com.dental.dao;

import com.dental.models.Klinika;
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

    public List<Klinika> findAll(){
        return em.createQuery("SELECT k FROM Klinika k").getResultList();
    }
}
