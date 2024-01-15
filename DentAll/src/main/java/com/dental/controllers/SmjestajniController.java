package com.dental.controllers;

import java.util.List;

import com.dental.models.Prijevoznik;
import com.dental.models.Smjestaj;
import com.dental.service.SmjestajService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/accomodation")
public class SmjestajniController {

    @Autowired
    private SmjestajService smjestajservis;

    @GetMapping("")
    public List<Smjestaj> listSmjestaj(){
        return smjestajservis.listAll();
    }

    @GetMapping("/Id")
    public Smjestaj getSmjestajById(@RequestBody Integer id){
        return smjestajservis.findSmjestajById(id);
    }

    @PostMapping("/create")
    public Smjestaj createSmjestaj(@RequestBody Smjestaj smjestaj){
        return smjestajservis.createSmjestaj(smjestaj);
    }

    @PostMapping("/update")
    public void updateSmjestaj(@RequestBody Smjestaj smjestaj) {
        smjestajservis.updateSmjestaj(smjestaj);
    }

    @PostMapping("/delete")
    public void deleteSmjestaj(@RequestBody Integer id){
        smjestajservis.deleteSmjestaj(id);
    }
}

