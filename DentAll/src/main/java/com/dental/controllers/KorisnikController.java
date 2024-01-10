package com.dental.controllers;

import com.dental.dao.KlinikaDao;
import com.dental.dao.PrijevoznikDao;
import com.dental.dao.PrijevoznikDaoImpl;
import com.dental.dao.SmjestajDaoImpl;
import com.dental.models.Klinika;
import com.dental.models.Korisnik;
import com.dental.models.Prijevoznik;
import com.dental.models.Putovanje;
import com.dental.service.KorisnikService;
import com.dental.service.PutovanjeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class KorisnikController {

    @Autowired
    private KorisnikService korisnikService;

    @GetMapping("")
    public List<Korisnik> listKorisnik(){
        return korisnikService.listAll();
    }

    @GetMapping("/Id")
    public Korisnik getKorisnikById(@RequestBody Integer id){
        return korisnikService.findKorisnikById(id);
    }

    @PostMapping("/create")
    public Korisnik createKorisnik(@RequestBody Korisnik korisnik){
        korisnikService.createKorisnik(korisnik);
        String kategorija = null, tip = null, kapacitet = null, adresa = null;
        Boolean dostupnost = true;
        LocalTime vrijeme = null;
        for(String p : korisnik.getPreference().split(",")){
            if(p.split(":")[0].equals("kategorija")) kategorija = p.split(":")[1];
            else if(p.split(":")[0].equals("tip")) tip = p.split(":")[1];
            else if(p.split(":")[0].equals("kapacitet")) kapacitet = p.split(":")[1];
            else if(p.split(":")[0].equals("adresa")) adresa= p.split(":")[1];
            else vrijeme = LocalTime.parse(p.split(":")[1]);
        }
        PutovanjeService putovanje = new PutovanjeService();
        KlinikaDao klinika = new KlinikaDao();
        PrijevoznikDaoImpl prijevoznik = new PrijevoznikDaoImpl();
        SmjestajDaoImpl smjestaj = new SmjestajDaoImpl();
        putovanje.add(new Putovanje(Time.valueOf(vrijeme), klinika.findKlinikaByAdresa(adresa).getId(), prijevoznik.findPrijevoznikByVozilo(kapacitet).getId(), smjestaj.findSmjestajByKategorijaTipDostupnost(kategorija, tip, dostupnost).getId(), korisnik.getId(), "tamo"));
        return korisnikService.findKorisnikById(korisnik.getId());
    }

    @PostMapping("/delete")
    public void deleteKorisnik(@RequestBody Integer id){
        korisnikService.deleteKorisnik(id);
    }
}
