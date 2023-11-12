package com.dental.vozilo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VoziloDao {
    @PersistenceContext
    private EntityManager em;

    public void persist(Vozilo vozilo){
        em.persist(vozilo);
    }

    public List findAll(){
        return em.createQuery("SELECT  v FROM Vozilo v").getResultList();
    }
}
