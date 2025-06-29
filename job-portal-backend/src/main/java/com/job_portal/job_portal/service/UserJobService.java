package com.job_portal.job_portal.service;

import com.job_portal.job_portal.model.Job;

import java.util.List;

public interface UserJobService {
    /* saved jobs */
    void saveJob(Long userId, Long jobId);

    void unsaveJob(Long userId, Long jobId);

    List<Job> listSaved(Long userId);

    /* applications */
    void apply(Long userId, Long jobId);

    List<Job> listApplied(Long userId);
}