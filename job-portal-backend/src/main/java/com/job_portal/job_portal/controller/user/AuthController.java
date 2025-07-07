package com.job_portal.job_portal.controller.user;

import com.job_portal.job_portal.dto.AuthRequest;
import com.job_portal.job_portal.dto.AuthResponse;
import com.job_portal.job_portal.dto.UserCreateDto;
import com.job_portal.job_portal.dto.UserDto;
import com.job_portal.job_portal.security.JwtUtil;
import com.job_portal.job_portal.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder encoder;

    /* login */
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest req) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );

        UserDto user = userService.getByUsername(req.getUsername());
        String token = jwtUtil.generateToken(req.getUsername());
        return new AuthResponse(token, user);
    }

    /* register */
    @PostMapping("/register")
    public UserDto register(@RequestBody @Valid UserCreateDto dto) {
        // double encoding cause issue
        // dto.setPassword(encoder.encode(dto.getPassword()));
        return userService.create(dto);
    }

    /* logout */
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // In JWT-based stateless auth, just respond with success.
        return ResponseEntity.ok("Logged out successfully");
    }
}

