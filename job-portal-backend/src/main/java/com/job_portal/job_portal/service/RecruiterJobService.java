package com.job_portal.job_portal.service;

import com.job_portal.job_portal.dto.JobDto;

import java.util.List;

public interface RecruiterJobService {
    List<JobDto> listOwn(Long recruiterId);

    JobDto create(Long recruiterId, JobDto dto);

    JobDto update(Long recruiterId, Long jobId, JobDto dto);

    void delete(Long recruiterId, Long jobId);
}
