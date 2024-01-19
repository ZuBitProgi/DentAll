package com.dental.security;

import io.jsonwebtoken.*;
import org.hibernate.annotations.Comment;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;

import java.security.SignatureException;
import java.util.Date;

import io.jsonwebtoken.security.Keys;
import java.security.Key;

import org.springframework.stereotype.Component;

@Component
public class JWTGenerator {
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);

        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        return token;

    }

    public String getUsernameFromJWT (String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return ((Claims) claims).getSubject();
    }


    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException ex) {
            System.out.println("MalformedJWTException");
        } catch (ExpiredJwtException ex) {
            // log the exception - token expired
            System.out.println("ExpiredJwtException");

        } catch (UnsupportedJwtException ex) {
            // log the exception - unsupported JWT
            System.out.println("UnsupportedJWT");

        } catch (IllegalArgumentException ex) {
            System.out.println("IllegalArgumentException");

            // log the exception - illegal argument
        } catch (JwtException ex) {
            System.out.println("JwtException");

            // log the exception - generic JWT exception
        }

        return false;

    }
}
