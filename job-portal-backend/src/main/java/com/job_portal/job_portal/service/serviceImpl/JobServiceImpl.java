package com.job_portal.job_portal.service.serviceImpl;

import com.job_portal.job_portal.dto.JobDto;
import com.job_portal.job_portal.exception.ResourceNotFoundException;
import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.repository.JobRepository;
import com.job_portal.job_portal.service.JobService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository repo;

    @Override
    public Page<Job> list(Pageable p) {
        return repo.findAll(p);
    }

    @Override
    public Job get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job " + id + " not found"));
    }

    @Override
    public Page<JobDto> getJobs(String title, String location, String company, String experience, int minSalary, int maxSalary, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Job> jobs = repo.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (!title.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
            }
            if (!location.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%"));
            }
            if (!company.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("company")), "%" + company.toLowerCase() + "%"));
            }
            if (!experience.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("experience")), "%" + experience.toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        }, pageable);

        return jobs.map(JobDto::from);
    }


    @Override
    public Job create(Job j) {
        return repo.save(j);
    }

    @Override
    public Job update(Long id, Job j) {
        if (!repo.existsById(id))
            throw new ResourceNotFoundException("Job " + id + " not found");
        j.setId(id);
        return repo.save(j);
    }

    @Override
    public void delete(Long id) {
        if (!repo.existsById(id))
            throw new ResourceNotFoundException("Job " + id + " not found");
        repo.deleteById(id);
    }
}
