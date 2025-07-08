package com.job_portal.job_portal.service;

import com.job_portal.job_portal.dto.JobDto;
import com.job_portal.job_portal.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface JobService {
    Page<Job> list(Pageable pageable);

    Page<JobDto> getJobs(String title, String location, String company, String experience, int minSalary, int maxSalary, int page, int size, String sortBy, String sortDir);

    Job get(Long id);

    Job create(Job job);

    Job update(Long id, Job job);

    void delete(Long id);
}