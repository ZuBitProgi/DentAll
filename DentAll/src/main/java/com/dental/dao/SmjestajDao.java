package com.dental.dao;

import com.dental.models.Smjestaj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface SmjestajDao extends JpaRepository<Smjestaj, Integer> {

    List<Smjestaj> findAll();

    List<Smjestaj> findAllById(Integer id);
    Smjestaj save(Smjestaj smjestaj);

    void deleteById(Integer id);
}
