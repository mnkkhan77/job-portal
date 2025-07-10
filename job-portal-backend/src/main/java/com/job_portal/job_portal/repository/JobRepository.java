package com.job_portal.job_portal.repository;

import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {
    Page<Job> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<Job> findByPostedBy(User user, Pageable pageable);

    List<Job> findByPostedById(Long recruiterId);

    Optional<Job> findByIdAndPostedById(Long id, Long recruiterId);
}
