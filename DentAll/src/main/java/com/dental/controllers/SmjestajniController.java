package com.dental.controllers;

import java.util.List;

import com.dental.models.Korisnik;
import com.dental.models.Prijevoznik;
import com.dental.models.Smjestaj;
import com.dental.service.KorisnikService;
import com.dental.service.SmjestajService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/accomodation")
public class SmjestajniController {

    @Autowired
    private SmjestajService smjestajservis;
    @Autowired
    private KorisnikService korisnikService;


    @GetMapping("")
    public List<Smjestaj> listSmjestaj(){
        return smjestajservis.listAll();
    }

    @GetMapping("/Id")
    public Smjestaj getSmjestajById(@RequestBody Integer id){
        return smjestajservis.findSmjestajById(id);
    }

    @PostMapping("/create")
    public HttpStatus createSmjestaj(@RequestBody Smjestaj smjestaj){
        try {
            smjestajservis.createSmjestaj(smjestaj);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @PostMapping("/update")
    public HttpStatus updateSmjestaj(@RequestBody Smjestaj smjestaj) {
        try {
            smjestajservis.updateSmjestaj(smjestaj);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @PostMapping("/delete")
    public HttpStatus deleteSmjestaj(@RequestBody Integer id) {
        try {
            smjestajservis.deleteSmjestaj(id);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }
    }
}

