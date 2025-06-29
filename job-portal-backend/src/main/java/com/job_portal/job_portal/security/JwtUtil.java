package com.job_portal.job_portal.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private static final long EXPIRATION_MS = 86_400_000; // 24 h
    /**
     * Base‑64 encoded 256‑bit key (env‑var in prod!)
     */
    @Value("${jwt.secret}")
    private String base64Secret;
    @Value("${jwt.expiration-ms}")
    private long expirationMs;
    private SecretKey key;

    @PostConstruct
    private void init() {
        key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(base64Secret));
    }


    /* ---------- create ---------- */
    public String generateToken(String username) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .subject(username)                     // new API
                .issuedAt(new Date(now))
                .expiration(new Date(now + EXPIRATION_MS))
                .signWith(key, Jwts.SIG.HS256)         // same constant, cleaner enum style
                .compact();
    }

    /* ---------- extract ---------- */
    public String extractUsername(String token) {
        return parse(token).getPayload().getSubject();
    }

    /* ---------- validate ---------- */
    public boolean isValid(String token, UserDetails ud) {
        Claims claims = parse(token).getPayload();
        return ud.getUsername().equals(claims.getSubject())
                && claims.getExpiration().after(new Date());
    }

    /* ---------- helper ---------- */
    private Jws<Claims> parse(String token) {
        return Jwts.parser()
                .verifyWith(key)           // new verifyWith
                .build()
                .parseSignedClaims(token); // replaces parseClaimsJws
    }
}