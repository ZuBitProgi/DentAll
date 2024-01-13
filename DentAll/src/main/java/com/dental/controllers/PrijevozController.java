package com.dental.controllers;

import com.dental.models.Prijevoznik;
import com.dental.models.Smjestaj;
import com.dental.service.PrijevoznikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/transport")
public class PrijevozController  {
    @Autowired
    private PrijevoznikService prijevozservis;

    @GetMapping("")
    public List<Prijevoznik> listPrijevoznik(){
        return prijevozservis.listAll();
    }

    @GetMapping("/Id")
    public Prijevoznik getPrijevoznikById(@RequestBody Integer id){
        return prijevozservis.findPrijevoznikById(id);
    }

    @PostMapping("/create")
    public Prijevoznik createPrijevoznik(@RequestBody Prijevoznik prijevoznik){
        return prijevozservis.createPrijevoznik(prijevoznik);
    }

    @PostMapping("/delete")
    public void deletePrijevoznik(@RequestBody Integer id){
        prijevozservis.deletePrijevoznik(id);
    }
}
