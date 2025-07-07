package com.job_portal.job_portal.service;

import com.job_portal.job_portal.dto.UserDto;
import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.model.User;

import java.util.List;

public interface AdminService {
    /* Jobs */
    List<Job> listJobs();
    Job getJob(Long id);
    Job createJob(Job job);
    Job updateJob(Long id, Job job);
    void deleteJob(Long id);

    /* Users */
    List<UserDto> listUsers();
    UserDto getUser(Long id);
    UserDto createUser(User user);
    UserDto updateUser(Long id, User user);
    void deleteUser(Long id);
}
