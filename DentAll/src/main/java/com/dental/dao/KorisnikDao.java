package com.dental.dao;

import com.dental.models.Korisnik;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

public interface KorisnikDao {
    List<Korisnik> findAll();

    Korisnik findKorisnikById(Integer id);

   Korisnik create(Korisnik korisnik);

    void deleteKorisnik(Integer id);
}
