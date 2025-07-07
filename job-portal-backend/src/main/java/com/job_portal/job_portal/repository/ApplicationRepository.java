package com.job_portal.job_portal.repository;

import com.job_portal.job_portal.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    boolean existsByUserIdAndJobId(Long userId, Long jobId);

    List<Application> findByUserId(Long userId);

    Optional<Application> findByUserIdAndJobId(Long userId, Long jobId);
}