package com.dental.dao;

import com.dental.models.Prijevoznik;
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

    public List<Prijevoznik> findAll(){
        return em.createQuery("SELECT p FROM Prijevoznik p").getResultList();
    }
}
