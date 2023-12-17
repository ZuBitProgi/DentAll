package com.dental.dao;

import com.dental.models.Prijevoznik;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class PrijevoznikDaoImpl implements PrijevoznikDao{
    @PersistenceContext
    private EntityManager em;
    @Override
    public Prijevoznik create(Prijevoznik prijevoznik){
        em.persist(prijevoznik);
        return prijevoznik;
    }
    @Override
    public void deletePrijevoznik(Integer id){
        Prijevoznik entityToRemove = em.find(Prijevoznik.class, id);
        if (entityToRemove != null) {
            em.remove(entityToRemove);
        }
    }
    @Override
    @Transactional(readOnly = true)
    public List<Prijevoznik> findAll(){
        return em.createQuery("SELECT p FROM Prijevoznik p",Prijevoznik.class)
                .getResultList();
    }
    @Override
    @Transactional(readOnly = true)
    public Prijevoznik findPrijevoznikById(Integer id){
        return em.createQuery("SELECT p FROM Prijevoznik p WHERE p.id = :id",Prijevoznik.class)
                .setParameter("id",id)
                .getSingleResult();
    }
}
