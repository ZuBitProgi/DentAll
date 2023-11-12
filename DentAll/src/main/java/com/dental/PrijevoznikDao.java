package com.dental.prijevoznik;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PrijevoznikDao {
    @PersistenceContext
    private EntityManager em;

    public void persist(Prijevoznik prijevoznik){
        em.persist(prijevoznik);
    }

    public List findAll(){
        return em.createQuery("SELECT p FROM Prijevoznik p").getResultList();
    }
}
