package com.dental.controllers;

import com.dental.models.Prijevoznik;
import com.dental.models.Smjestaj;
import com.dental.service.PrijevoznikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public HttpStatus createPrijevoznik(@RequestBody Prijevoznik prijevoznik){
        try {
            prijevozservis.createPrijevoznik(prijevoznik);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }

    }

    @PostMapping("/delete")
    public HttpStatus deletePrijevoznik(@RequestBody Integer id){
        try {
            prijevozservis.deletePrijevoznik(id);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @PostMapping("/update")
    public HttpStatus updatePrijevoznik(@RequestBody Prijevoznik prijevoznik) {
        try {
            prijevozservis.updatePrijevoznik(prijevoznik);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }
    }
}
