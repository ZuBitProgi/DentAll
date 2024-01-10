package com.dental.dao;

import com.dental.models.Putovanje;

import java.util.List;

public interface PutovanjeDao {

    void deletePutovanje(Integer id);
    List<Putovanje> findAll();
    Putovanje findPutovanjeById(Integer id);
    Putovanje create(Putovanje putovanje);
}
