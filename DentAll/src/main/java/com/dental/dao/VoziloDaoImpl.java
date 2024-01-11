package com.dental.dao;

import com.dental.models.Vozilo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VoziloDaoImpl implements VoziloDao{
    @PersistenceContext
    private EntityManager em;

    public void persist(Vozilo vozilo){
        em.persist(vozilo);
    }

    public List<Vozilo> findAll(){
        return em.createQuery("SELECT  v FROM Vozilo v").getResultList();
    }

    public List<Vozilo> findByKapacitet(String kapacitet) {return em.createQuery("SELECT v FROM Vozilo v WHERE v.kapacitet = :kapacitet", Vozilo.class).setParameter("kapacitet", kapacitet).getResultList();}
}
