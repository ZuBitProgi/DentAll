package com.dental.controllers;

import com.dental.dao.KlinikaDao;
import com.dental.dao.KlinikaDaoImpl;
import com.dental.dao.PrijevoznikDaoImpl;
import com.dental.dao.SmjestajDaoImpl;
import com.dental.models.Korisnik;
import com.dental.models.Prijevoznik;
import com.dental.models.Putovanje;
import com.dental.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class KorisnikController {

    @Autowired
    private KorisnikService korisnikService;
    @Autowired
    private KlinikaService klinikaService;

    @Autowired
    private PrijevoznikService prijevoznikService;

    @Autowired
    private SmjestajService smjestajService;
    @Autowired
    private PutovanjeService putovanjeService;
    @Autowired
    private EmailService emailService;
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
        Putovanje putovanje = new Putovanje(Time.valueOf(vrijeme), klinikaService.findKlinikaByAdresa(adresa).getId(), prijevoznikService.findPrijevoznikByVozilo(kapacitet).getId(), smjestajService.findSmjestajByKategorijaTipDostupnost(kategorija, tip, dostupnost).getId(), korisnik.getId(), "tamo");
        Putovanje feedback=putovanjeService.create(putovanje);
        if(feedback != null){
            try {
                String to = korisnik.getKontakt();
                String subject = "Registracija";
                String content = "Uspjesna autorizacija!";
                emailService.sendEmail(to, subject, content);
            } catch (Exception e) {
                // Handle the exception (log it, throw a custom exception, etc.)
                e.printStackTrace();
            }
        }
        //KlinikaDaoImpl klinika = new KlinikaDaoImpl();
        //PrijevoznikDaoImpl prijevoznik = new PrijevoznikDaoImpl();
        //SmjestajDaoImpl smjestaj = new SmjestajDaoImpl();
        return korisnikService.createKorisnik(korisnik);
        //return korisnikService.findKorisnikById(korisnik.getId());
    }

    private void sendMail(String kontakt) {

    }

    @PostMapping("/delete")
    public void deleteKorisnik(@RequestBody Integer id){
        korisnikService.deleteKorisnik(id);
    }
}
