package com.dental.service;

import com.dental.dao.PutovanjeDaoImpl;
import com.dental.models.Putovanje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Component
public class PutovanjeService {
    @Autowired
    private PutovanjeDaoImpl putovanjeDaoImpl;

    @Transactional
    public void create(Putovanje putovanje){
        putovanjeDaoImpl.create(putovanje);
    }

    @Transactional
    public void createAll(Collection<Putovanje> putovanje){
        for(Putovanje p : putovanje) putovanjeDaoImpl.create(p);
    }

    @Transactional(readOnly = true)
    public List<Putovanje> listAll(){
        return putovanjeDaoImpl.findAll();
    }
}


