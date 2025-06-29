package com.job_portal.job_portal.service.serviceImpl;

import com.job_portal.job_portal.dto.JobDto;
import com.job_portal.job_portal.exception.ResourceNotFoundException;
import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.repository.JobRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JobServiceImplTest {

    @Mock
    JobRepository repo;
    @InjectMocks
    JobServiceImpl service;

    private Job sample() {
        return Job.builder()
                .id(1L).title("Java Dev").company("ACME")
                .location("Remote").experience("2+ years")
                .minSalary(50_000).maxSalary(80_000)
                .description("sample").build();
    }

    @Test
    void list_ok() {
        Page<Job> page = new PageImpl<>(List.of(sample()));
        Pageable p = PageRequest.of(0, 10);
        when(repo.findAll(p)).thenReturn(page);
        assertThat(service.list(p)).hasSize(1);
    }

    @Test
    void get_not_found() {
        when(repo.findById(99L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> service.get(99L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void filter_and_paging() {
        Page<Job> page = new PageImpl<>(List.of(sample()));
        when(repo.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(page);
        Page<JobDto> out = service.getJobs("java", "", "", "",
                0, 10, "id", "asc");
        assertThat(out.getTotalElements()).isEqualTo(1);
    }
}
