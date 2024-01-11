package com.dental.dao;

import com.dental.models.Klinika;
import com.dental.models.Smjestaj;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class KlinikaDaoImpl implements KlinikaDao{
    @PersistenceContext
    private EntityManager em;
    @Override
    public Klinika create(Klinika klinika){
        em.persist(klinika);
        return klinika;
    }
    @Override
    public List<Klinika> findAll(){
        return em.createQuery("SELECT k FROM Klinika k")
                .getResultList();
    }

    @Override
    public Klinika findKlinikaById(Integer id) {
        return em.createQuery("SELECT k FROM Klinika s WHERE k.id = :id", Klinika.class)
                .setParameter("id",id)
                .getSingleResult();
    }

    @Override
    public void deleteKlinika(Integer id) {
        Klinika entityToRemove = em.find(Klinika.class, id);
        if (entityToRemove != null) {
            em.remove(entityToRemove);
        }
    }
    @Override
    public Klinika findKlinikaByAdresa(String adresa) {
        return em.createQuery("SELECT k FROM Klinika k WHERE k.adresa = :adresa", Klinika.class)
                .setParameter("adresa", adresa)
                .getSingleResult(); }
}
