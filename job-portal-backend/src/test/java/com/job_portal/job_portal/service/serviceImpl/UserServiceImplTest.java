package com.job_portal.job_portal.service.serviceImpl;

import com.job_portal.job_portal.dto.UserCreateDto;
import com.job_portal.job_portal.exception.BadRequestException;
import com.job_portal.job_portal.exception.ResourceNotFoundException;
import com.job_portal.job_portal.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    UserRepository repo;
    @Spy
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    @InjectMocks
    UserServiceImpl service;

    @Test
    void create_duplicate_username() {
        UserCreateDto dto = UserCreateDto.builder()
                .username("dup").password("pw").email("e@x").build();
        when(repo.existsByUsername("dup")).thenReturn(true);

        assertThatThrownBy(() -> service.create(dto))
                .isInstanceOf(BadRequestException.class);
    }

    @Test
    void getByUsername_not_found() {
        when(repo.findByUsername("none")).thenReturn(Optional.empty());
        assertThatThrownBy(() -> service.getByUsername("none"))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
