package com.job_portal.job_portal.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Global CORS configuration.
 *
 * Reads allowed origins from application properties:
 *
 *   cors.allowed-origins=http://localhost:5173,https://your-frontend.com
 *
 * Add or change origins in one place – no code changes needed.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Comma‑separated list of allowed origins injected from
     * application.properties
     */
    @Value("${cors.allowed-origins}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/api/**")          // all REST paths
                .allowedOrigins(allowedOrigins) // frontend URLs
                .allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS")
                .allowedHeaders("*")
                .allowedMethods("*")
                // If you ever need to expose specific headers (e.g. JWT in header)
                // .exposedHeaders("Authorization")
                .allowCredentials(true)         // if you use cookies / auth headers
                .maxAge(3600);                  // cache pre‑flight for 1h
    }
}
