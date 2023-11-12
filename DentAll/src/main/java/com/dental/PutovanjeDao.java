package com.dental.putovanje;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PutovanjeDao {
    @PersistenceContext
    private EntityManager em;

    public void persist(Putovanje putovanje){
        em.persist(putovanje);
    }

    public List findAll(){
        return em.createQuery("SELECT  p FROM Putovanje p").getResultList();
    }
}
