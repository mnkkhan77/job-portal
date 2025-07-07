package com.job_portal.job_portal.config;

import com.job_portal.job_portal.security.JwtAuthFilter;
import com.job_portal.job_portal.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.Customizer;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtFilter;
    private final UserDetailsServiceImpl uds;

    /* ───────────────────────────────────────── filter chain ───────────────────────────────────────── */
    @Bean
    public SecurityFilterChain filter(HttpSecurity http) throws Exception {

        http
                .cors(Customizer.withDefaults()) // ✅ updated to avoid deprecated .cors()
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        /* --- public endpoints --- */
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/api/auth/**", "/api/jobs/**")
                        .permitAll()

                        /* --- admin area (all paths that start with /api/admin/) --- */
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        /* --- everything else requires login --- */
                        .anyRequest().authenticated()
                )
                // ✅ removed deprecated .userDetailsService(), Spring uses the UserDetailsService bean below
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /* ─────────────────────────────────────── helpers ─────────────────────────────────────── */

    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /* ─────────────────────────────────────── user details service ─────────────────────────────────────── */
    @Bean
    public UserDetailsService userDetailsService() {
        return uds;
    }

    /* ──────────────────────────────────────── CORS config ──────────────────────────────────────── */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("*")); // Adjust in production!
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // Optional: allows cookies/auth headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
