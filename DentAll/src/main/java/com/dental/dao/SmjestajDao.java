package com.dental.dao;

import com.dental.models.Smjestaj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


public interface SmjestajDao {

    List<Smjestaj> findAll();

    Smjestaj findSmjestajById(Integer id);
    Smjestaj create(Smjestaj smjestaj);

    List<Smjestaj> findByPreference(String preference);
    void deleteSmjestaj(Integer id);
}
