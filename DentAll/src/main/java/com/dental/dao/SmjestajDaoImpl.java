package com.dental.dao;

import com.dental.models.Prijevoznik;
import com.dental.models.Smjestaj;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Component
public class SmjestajDaoImpl implements SmjestajDao{
    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional(readOnly = true)
    public List<Smjestaj> findAll() {
        return em.createQuery("SELECT s FROM Smjestaj s",Smjestaj.class)
                .getResultList();
    }

    @Override
    @Transactional(readOnly = true)
    public Smjestaj findSmjestajById(Integer id) {
        return em.createQuery("SELECT s FROM Smjestaj s WHERE s.id = :id", Smjestaj.class)
                .setParameter("id",id)
                .getSingleResult();
    }

    @Override
    public Smjestaj create(Smjestaj smjestaj) {
        em.persist(smjestaj);
        return smjestaj;
    }

    @Override
    public List<Smjestaj> findByPreference(String preference) {
        return em.createQuery("SELECT s FROM Smjestaj WHERE...")
                .getResultList();
    }

    @Override
    public void deleteSmjestaj(Integer id) {
        Smjestaj entityToRemove = em.find(Smjestaj.class, id);
        if (entityToRemove != null) {
            em.remove(entityToRemove);
        }
    }
}
