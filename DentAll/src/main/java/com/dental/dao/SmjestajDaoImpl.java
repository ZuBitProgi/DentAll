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
    @Transactional(readOnly = true)
    public Smjestaj findSmjestajByAdresa(String adresa){
        return em.createQuery("SELECT s FROM Smjestaj s WHERE s.adresa = :adresa", Smjestaj.class).setParameter("adresa", adresa).getSingleResult();
    }

    @Override
    @Transactional(readOnly = true)
    public Smjestaj findSmjestajByKategorijaTipDostupnost(String kategorija, String tip, Boolean dostupnost){
        return em.createQuery("SELECT s FROM Smjestaj s WHERE s.kategorija = :kategorija AND s.tip = :tip AND s.dostupnost = :dostupnost", Smjestaj.class)
                .setParameter("kategorija", kategorija)
                .setParameter("tip", tip)
                .setParameter("dostupnost", dostupnost)
                .setMaxResults(1)
                .getSingleResult();
    }

    @Override
    @Transactional
    public Smjestaj create(Smjestaj smjestaj) {
        em.persist(smjestaj);
        return smjestaj;
    }

    @Override
    @Transactional
    public void deleteSmjestaj(Integer id) {
        Smjestaj entityToRemove = em.find(Smjestaj.class, id);
        if (entityToRemove != null) {
            em.remove(entityToRemove);
        }
    }
}
