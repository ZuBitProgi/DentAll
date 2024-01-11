package com.dental.dao;

import com.dental.models.Putovanje;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class PutovanjeDaoImpl implements PutovanjeDao{
    @PersistenceContext
    private EntityManager em;



    @Override
    public void deletePutovanje(Integer id) {

    }

    public List<Putovanje> findAll(){
        return em.createQuery("SELECT  p FROM Putovanje p").getResultList();
    }

    @Override
    public Putovanje findPutovanjeById(Integer id) {
        return null;
    }
    @Transactional
    @Override
    public Putovanje create(Putovanje putovanje) {
        em.persist(putovanje);
        return putovanje;
    }
}
