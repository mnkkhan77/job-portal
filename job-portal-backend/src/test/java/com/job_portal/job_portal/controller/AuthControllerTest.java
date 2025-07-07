package com.job_portal.job_portal.controller;

import com.job_portal.job_portal.controller.user.AuthController;
import com.job_portal.job_portal.dto.AuthRequest;
import com.job_portal.job_portal.dto.AuthResponse;
import com.job_portal.job_portal.dto.UserDto;
import com.job_portal.job_portal.security.JwtUtil;
import com.job_portal.job_portal.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    AuthenticationManager authMgr;
    @Mock
    UserService userService;
    @Mock
    JwtUtil jwtUtil;
    @Mock
    PasswordEncoder encoder;

    @InjectMocks
    AuthController ctrl;

    @Test
    void login_success() {
        AuthRequest req = new AuthRequest("buddy", "pw");
        UserDto dto = new UserDto(1L, "buddy", "e@mail.com", "USER");
        when(authMgr.authenticate(any(Authentication.class))).thenReturn(mock(Authentication.class));
        when(userService.getByUsername("buddy")).thenReturn(dto);
        when(jwtUtil.generateToken("buddy")).thenReturn("jwt");

        AuthResponse res = ctrl.login(req);
        assertThat(res.getToken()).isEqualTo("jwt");
    }
}
