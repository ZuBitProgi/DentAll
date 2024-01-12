package com.dental.dao;

import com.dental.models.Vozilo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class VoziloDaoImpl implements VoziloDao{
    @PersistenceContext
    private EntityManager em;
    @Override
    @Transactional
    public Vozilo create(Vozilo vozilo){
        em.persist(vozilo);
        return vozilo;
    }
    @Override
    @Transactional(readOnly = true)
    public List<Vozilo> findAll(){
        return em.createQuery("SELECT  v FROM Vozilo v").getResultList();
    }
    @Override
    @Transactional(readOnly = true)
    public List<Vozilo> findByKapacitet(String kapacitet) {
        return em.createQuery("SELECT v FROM Vozilo v WHERE v.kapacitet = :kapacitet", Vozilo.class)
                .setParameter("kapacitet", kapacitet).getResultList();
    }
}
