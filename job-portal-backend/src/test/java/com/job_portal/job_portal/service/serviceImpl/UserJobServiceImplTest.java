package com.job_portal.job_portal.service.serviceImpl;

import com.job_portal.job_portal.exception.BadRequestException;
import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.model.SavedJob;
import com.job_portal.job_portal.model.User;
import com.job_portal.job_portal.repository.ApplicationRepository;
import com.job_portal.job_portal.repository.JobRepository;
import com.job_portal.job_portal.repository.SavedJobRepository;
import com.job_portal.job_portal.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

class UserJobServiceImplTest {

    @Mock
    UserRepository userRepo;
    @Mock
    JobRepository jobRepo;
    @Mock
    SavedJobRepository savedRepo;
    @Mock
    ApplicationRepository appRepo;

    @InjectMocks
    UserJobServiceImpl service;

    @BeforeEach
    void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveJob_ok() {
        when(userRepo.findById(1L)).thenReturn(Optional.of(new User()));
        when(jobRepo.findById(2L)).thenReturn(Optional.of(new Job()));
        when(savedRepo.existsByUserIdAndJobId(1L, 2L)).thenReturn(false);

        service.saveJob(1L, 2L);
        verify(savedRepo).save(any(SavedJob.class));
    }

    @Test
    void saveJob_duplicate_throws() {
        when(userRepo.findById(1L)).thenReturn(Optional.of(new User()));
        when(jobRepo.findById(2L)).thenReturn(Optional.of(new Job()));
        when(savedRepo.existsByUserIdAndJobId(1L, 2L)).thenReturn(true);

        assertThatThrownBy(() -> service.saveJob(1L, 2L))
                .isInstanceOf(BadRequestException.class);
    }
}