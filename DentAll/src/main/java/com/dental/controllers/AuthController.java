package com.dental.controllers;


import com.dental.dto.AuthResponseDTO;
import com.dental.dto.LoginDto;
import com.dental.dto.RegisterDto;
import com.dental.models.Role;
import com.dental.models.UserEntity;
import com.dental.repository.RoleRepository;
import com.dental.repository.UserRepository;
import com.dental.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    private JWTGenerator jwtGenerator;

    @Autowired
    public AuthController(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTGenerator jwtGenerator) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
    }

   @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            return new ResponseEntity<>("Error: Username already exists", HttpStatus.BAD_REQUEST);
        }
        List<Role> roles = new ArrayList<Role>();
        roles = registerDto.getRoles().stream().map(string -> new Role(string)).toList();
        if (roles.isEmpty()) {
            return new ResponseEntity<>("Error: No role selected", HttpStatus.BAD_REQUEST);
        }
       UserEntity user = new UserEntity(registerDto.getUsername(), passwordEncoder.encode(registerDto.getPassword()));
       user.setRoles(roles);

       userRepository.save(user);

       return new ResponseEntity<>("User successfully added to db", HttpStatus.OK);

   }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto){
        try {
            UserEntity user = userRepository.findByUsername(loginDto.getUsername()).get();
            if (user.getRoles().stream().map(Role::getName).toList().contains(loginDto.getRole())) {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginDto.getUsername(),
                                loginDto.getPassword()));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String token = jwtGenerator.generateToken(authentication);
                return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }
}
