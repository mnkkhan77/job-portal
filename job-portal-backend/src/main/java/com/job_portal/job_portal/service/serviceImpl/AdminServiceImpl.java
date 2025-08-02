package com.job_portal.job_portal.service.serviceImpl;

import com.job_portal.job_portal.dto.JobCreateDto;
import com.job_portal.job_portal.dto.JobDto;
import com.job_portal.job_portal.dto.UserDto;
import com.job_portal.job_portal.exception.ResourceNotFoundException;
import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.model.User;
import com.job_portal.job_portal.repository.JobRepository;
import com.job_portal.job_portal.repository.UserRepository;
import com.job_portal.job_portal.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final JobRepository jobRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    /* ───────────── JOBS ───────────── */

    public List<JobDto> listJobs() {
        return jobRepo.findAll()
                .stream()
                .map(JobDto::from)
                .toList();
    }


    @Override
    public Job getJob(Long id) {
        return jobRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job " + id + " not found"));
    }

    @Override
    public Job createJob(JobCreateDto dto, User poster) {
        Job job = new Job();
        job.setTitle(dto.title());
        job.setCompany(dto.company());
        job.setLocation(dto.location());
        job.setExperience(dto.experience());
        job.setMinSalary(dto.minSalary());
        job.setMaxSalary(dto.maxSalary());
        job.setDescription(dto.description());
        job.setJobLink(dto.jobLink());
        job.setPostedBy(poster);

        return jobRepo.save(job);
    }

    @Override
    public Job updateJob(Long id, JobCreateDto dto, User requester) {
        Job job = jobRepo.findById(id).orElseThrow();

        job.setTitle(dto.title());
        job.setCompany(dto.company());
        job.setLocation(dto.location());
        job.setExperience(dto.experience());
        job.setMinSalary(dto.minSalary());
        job.setMaxSalary(dto.maxSalary());
        job.setDescription(dto.description());
        job.setJobLink(dto.jobLink());

        return jobRepo.save(job);
    }

    @Override
    public void deleteJob(Long id, User requester) {
        Job job = jobRepo.findById(id).orElseThrow();
        jobRepo.delete(job);
    }


    /* ───────────── USERS ───────────── */

    @Override
    public List<UserDto> listUsers() {
        return userRepo.findAll().stream().map(UserDto::from).toList();
    }

    @Override
    public UserDto getUser(Long id) {
        User u = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User " + id + " not found"));
        return UserDto.from(u);
    }

    @Override
    public UserDto createUser(User u) {
        u.setPassword(encoder.encode(u.getPassword()));
        return UserDto.from(userRepo.save(u));
    }

    @Override
    public UserDto updateUser(Long id, User u) {
        User existing = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User " + id + " not found"));

        existing.setUsername(u.getUsername());
        existing.setEmail(u.getEmail());
        existing.setRole(u.getRole());
        if (u.getPassword() != null && !u.getPassword().isBlank())
            existing.setPassword(encoder.encode(u.getPassword()));

        return UserDto.from(userRepo.save(existing));
    }

    @Override
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
}

