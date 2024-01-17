package com.dental.controllers;

import com.dental.dao.KlinikaDao;
import com.dental.dao.KlinikaDaoImpl;
import com.dental.dao.PrijevoznikDaoImpl;
import com.dental.dao.SmjestajDaoImpl;
import com.dental.models.Korisnik;
import com.dental.models.Prijevoznik;
import com.dental.models.Putovanje;
import com.dental.models.Smjestaj;
import com.dental.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalTime;
import java.util.List;

@RestController
@CrossOrigin
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

        String kategorija = "1", tip = "stan";
        Integer kapacitet = 0;
        Boolean dostupnost = true;
        Time vrijeme = new Time(8, 0, 0);
        for(String p : korisnik.getPreference().split(",")){
            if (p.startsWith("tip")) {
                tip = p.split(":")[1];
            } else if (p.startsWith("kategorija")) {
                kategorija = p.split(":")[1];
            } else if (p.startsWith("kapacitet")) {
                kapacitet = Integer.parseInt(p.split(":")[1]);
            } else if (p.startsWith("vrijeme")) {
                vrijeme = Time.valueOf(p.split(":")[1]);
            }
        }
        Putovanje putovanje = new Putovanje(vrijeme,0, prijevoznikService.findPrijevoznikByVozilo(kapacitet).getId(), smjestajService.findSmjestajByKategorijaTipDostupnost(kategorija, tip, dostupnost).getId(), korisnik.getId(), "tamo");
        Putovanje feedback = putovanjeService.create(putovanje);
        if(feedback != null){
            try {
                String to = korisnik.getKontakt();
                String subject = "Ponuda klinike iz servisa DentAll";
                Smjestaj s = smjestajService.findSmjestajById(feedback.getSmjestajId());
                Prijevoznik p = prijevoznikService.findPrijevoznikById(feedback.getPrijevoznikId());
                String content = "Smjestaj: " + s.getAdresa() + "\nPrijevoznik: " + p.getModel() + "\nVrijeme polaska: " + feedback.getVrijeme().toString();

                //emailService.sendEmail(to, subject, content);
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

    @PostMapping("/update")
    public void updateKorisnik(@RequestBody Korisnik korisnik) {
        korisnikService.updateKorisnik(korisnik);
    }
    @PostMapping("/delete")
    public void deleteKorisnik(@RequestBody Integer id){
        korisnikService.deleteKorisnik(id);
    }
}
