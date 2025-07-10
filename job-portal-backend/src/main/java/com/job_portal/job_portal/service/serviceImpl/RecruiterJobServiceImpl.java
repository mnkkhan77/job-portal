package com.job_portal.job_portal.service.serviceImpl;

import com.job_portal.job_portal.dto.JobDto;
import com.job_portal.job_portal.exception.ResourceNotFoundException;
import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.model.User;
import com.job_portal.job_portal.repository.JobRepository;
import com.job_portal.job_portal.repository.UserRepository;
import com.job_portal.job_portal.service.RecruiterJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecruiterJobServiceImpl implements RecruiterJobService {

    private final JobRepository repo;
    private final UserRepository users;

    @Override
    public List<JobDto> listOwn(Long recruiterId) {
        return repo.findByPostedById(recruiterId)
                .stream()
                .map(JobDto::from)
                .toList();
    }

    @Override
    public JobDto create(Long recruiterId, JobDto dto) {

        User postedBy = users.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found"));

        Job job = JobDto.toEntity(dto);
        job.setPostedBy(postedBy);

        return JobDto.from(repo.save(job));
    }


    @Override
    public JobDto update(Long recruiterId, Long jobId, JobDto dto) {
        Job j = repo.findByIdAndPostedById(jobId, recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found or not yours"));
        j.setTitle(dto.getTitle());
        j.setCompany(dto.getCompany());
        j.setLocation(dto.getLocation());
        j.setExperience(dto.getExperience());
        j.setDescription(dto.getDescription());
        j.setMinSalary(dto.getMinSalary());
        j.setMaxSalary(dto.getMaxSalary());
        return JobDto.from(repo.save(j));
    }

    @Override
    public void delete(Long recruiterId, Long jobId) {
        Job j = repo.findByIdAndPostedById(jobId, recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found or not yours"));
        repo.delete(j);
    }
}