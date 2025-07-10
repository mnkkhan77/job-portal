package com.job_portal.job_portal.service;

import com.job_portal.job_portal.dto.JobCreateDto;
import com.job_portal.job_portal.dto.JobDto;
import com.job_portal.job_portal.dto.UserDto;
import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.model.User;

import java.util.List;

public interface AdminService {
    /* Jobs */
    List<JobDto> listJobs();
    Job getJob(Long id);
    Job createJob(JobCreateDto dto, User poster);
    Job updateJob(Long id, JobCreateDto dto, User requester);
    void deleteJob(Long id, User requester);

    /* Users */
    List<UserDto> listUsers();
    UserDto getUser(Long id);
    UserDto createUser(User user);
    UserDto updateUser(Long id, User user);
    void deleteUser(Long id);
}
