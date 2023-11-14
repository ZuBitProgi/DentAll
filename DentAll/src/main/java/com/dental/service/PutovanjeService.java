package com.dental.service;

import com.dental.dao.PutovanjeDao;
import com.dental.models.Putovanje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Component
public class PutovanjeService {
    @Autowired
    private PutovanjeDao putovanjeDao;

    @Transactional
    public void add(Putovanje putovanje){
        putovanjeDao.persist(putovanje);
    }

    @Transactional
    public void addAll(Collection<Putovanje> putovanje){
        for(Putovanje p : putovanje) putovanjeDao.persist(p);
    }

    @Transactional(readOnly = true)
    public List<Putovanje> listAll(){
        return putovanjeDao.findAll();
    }
}
