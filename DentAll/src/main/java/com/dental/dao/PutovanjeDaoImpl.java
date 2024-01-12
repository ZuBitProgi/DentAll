package com.dental.dao;

import com.dental.models.Prijevoznik;
import com.dental.models.Putovanje;
import com.dental.models.Smjestaj;
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
    @Transactional
    public void deletePutovanje(Integer id) {
        Putovanje entityToRemove = em.find(Putovanje.class, id);
        if (entityToRemove != null) {
            em.remove(entityToRemove);
        }
    }
    @Override
    @Transactional(readOnly = true)
    public List<Putovanje> findAll(){
        return em.createQuery("SELECT  p FROM Putovanje p").getResultList();
    }

    @Override
    @Transactional(readOnly = true)
    public Putovanje findPutovanjeById(Integer id) {
        return em.createQuery("SELECT p FROM Putovanje p WHERE p.id = :id", Putovanje.class)
                .setParameter("id",id)
                .getSingleResult();
    }

    @Override
    @Transactional
    public Putovanje create(Putovanje putovanje) {
        em.persist(putovanje);
        return putovanje;
    }
}
