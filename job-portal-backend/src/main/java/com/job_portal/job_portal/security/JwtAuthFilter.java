package com.job_portal.job_portal.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl uds;   // ← loads FULL MyUserDetails

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

        String hdr = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (hdr == null || !hdr.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        String token    = hdr.substring(7);
        String username = jwtUtil.extractUsername(token);

        if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            /* 1️⃣  this returns *new MyUserDetails(fullUser)* */
            UserDetails userDetails = uds.loadUserByUsername(username);

            if (jwtUtil.isValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());

                auth.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(request, response);
    }
}
