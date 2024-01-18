package com.dental.controllers;

import com.dental.DentAllApplication;
import com.dental.dto.LoginDto;
import com.dental.dto.RegisterDto;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Propagation;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class AuthControllerTests {

    @Autowired
    AuthController controller;

    @Test
    public void contextLoads() {
        assertThat(controller).isNotNull();
    }

    @Test
    public void registerAllValuesProvided() {
        List<String> roles = new ArrayList<>();
        roles.add("sleep_admin");

        assertThat(controller.register(new RegisterDto("new_user", "user_pass", roles))).isEqualTo(new ResponseEntity<>("User successfully added to db", HttpStatus.OK));
    }

    @Test
    public void registerWithUsernameExists() {
        List<String> roles = new ArrayList<>();
        roles.add("sleep_admin");

        controller.register(new RegisterDto("username", "password", roles));

        assertThat(controller.register(new RegisterDto("username", "password", roles))).isEqualTo(new ResponseEntity<>("Error: Username already exists", HttpStatus.BAD_REQUEST));
    }

    @Test
    public void registerWithNoRoles() {
        assertThat(controller.register(new RegisterDto("user_no_roles", "user_pass", new ArrayList<>()))).isEqualTo(new ResponseEntity<>("Error: No role selected", HttpStatus.BAD_REQUEST));
    }

    @Test
    public void loginWithProperCreds() {
        List<String> roles = new ArrayList<>();
        roles.add("sleep_admin");

        controller.register(new RegisterDto("username", "password", roles));

        assertThat(controller.login(new LoginDto("username", "password", "sleep_admin")).getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void loginWithWrongPassword() {
        List<String> roles = new ArrayList<>();
        roles.add("sleep_admin");

        controller.register(new RegisterDto("username", "password", roles));

        assertThat(controller.login(new LoginDto("username", "pass", "sleep_admin")).getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void loginWithWrongUsername() {
        List<String> roles = new ArrayList<>();
        roles.add("sleep_admin");

        controller.register(new RegisterDto("username", "password", roles));

        assertThat(controller.login(new LoginDto("user", "password", "sleep_admin")).getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void loginWithWrongRole() {
        List<String> roles = new ArrayList<>();
        roles.add("sleep_admin");

        controller.register(new RegisterDto("username", "password", roles));

        assertThat(controller.login(new LoginDto("username", "password", "user_admin")).getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void loginWithImpossibleRole() {
        List<String> roles = new ArrayList<>();
        roles.add("sleep_admin");

        controller.register(new RegisterDto("username", "password", roles));

        assertThat(controller.login(new LoginDto("username", "password", "impossible_admin")).getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
}

