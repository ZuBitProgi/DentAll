package com.dental.controllers;

import com.dental.dao.PutovanjeDaoImpl;
import com.dental.dao.SmjestajDaoImpl;
import com.dental.models.Korisnik;
import com.dental.models.Prijevoznik;
import com.dental.models.Putovanje;
import com.dental.models.Smjestaj;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.test.context.ActiveProfiles;

import java.sql.Time;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class KorisnikControllerTest {

    @Autowired
    KorisnikController controller;

    @Autowired
    PrijevozController prijevozController;

    @Autowired
    SmjestajniController smjestajniController;

    @Autowired
    PutovanjeDaoImpl putovanjeDao;

    @Autowired
    SmjestajDaoImpl smjestajDao;

    @Test
    public void contextLoaded() {
        assertThat(controller).isNotNull();
    }

    @Test
    public void createKorisnikDefaultPreferencesStatus() {
        prijevozController.createPrijevoznik(new Prijevoznik(null, "kontak@prijevoz.com", new Time(8, 0, 0), new Time(15, 0, 0), "auto", 4, "Opel Ad Astra"));
        smjestajniController.createSmjestaj(new Smjestaj("stan", "1", "Baker Street 221B", true));

        HttpStatus status = controller.createKorisnik(new Korisnik("Brad", "Pitt", "", "pitt@brad.com"));
        assertThat(status).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void createKorisnikDefaultPreferencesPutovanje() {
        prijevozController.createPrijevoznik(new Prijevoznik(null, "kontak@prijevoz.com", new Time(8, 0, 0), new Time(15, 0, 0), "auto", 4, "Opel Ad Astra"));
        smjestajniController.createSmjestaj(new Smjestaj("kuca", "1", "Baker Street 221B", true));
        smjestajniController.createSmjestaj(new Smjestaj("stan", "1", "Baker Street 221B", true));

        HttpStatus status = controller.createKorisnik(new Korisnik("Brad", "Pitt", "", "pitt@brad.com"));
        Putovanje p = putovanjeDao.findPutovanjeById(1);
        assertThat(status).isEqualTo(HttpStatus.OK);
        assertThat(p.getPrijevoznikId()).isEqualTo(1);
        assertThat(p.getSmjestajId()).isEqualTo(2);
    }

    @Test
    public void createKorisnikWithAPreference() {
        prijevozController.createPrijevoznik(new Prijevoznik(null, "kontak@prijevoz.com", new Time(8, 0, 0), new Time(15, 0, 0), "auto", 4, "Opel Ad Astra"));
        smjestajniController.createSmjestaj(new Smjestaj("kuca", "1", "Baker Street 221B", true));
        smjestajniController.createSmjestaj(new Smjestaj("stan", "1", "Baker Street 221B", true));

        HttpStatus status = controller.createKorisnik(new Korisnik("Brad", "Pitt", "tip:kuca", "pitt@brad.com"));
        Putovanje p = putovanjeDao.findPutovanjeById(3);

        assertThat(status).isEqualTo(HttpStatus.OK);
        assertThat(p.getPrijevoznikId()).isEqualTo(1);
        assertThat(p.getSmjestajId()).isEqualTo(1);
    }

    @Test
    public void getKorisnikById() {
        HttpStatus status = controller.getKorisnikById(1);
        assertThat(status).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getKorisnikByInvalidId() {
        HttpStatus status = controller.getKorisnikById(-1);
        assertThat(status).isEqualTo(HttpStatus.BAD_REQUEST);
    }
}
