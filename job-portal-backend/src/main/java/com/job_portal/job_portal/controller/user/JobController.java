package com.job_portal.job_portal.controller.user;

import com.job_portal.job_portal.dto.JobDto;
import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService service;

    @GetMapping
    public ResponseEntity<Page<JobDto>> getAllJobs(
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "") String location,
            @RequestParam(defaultValue = "") String company,
            @RequestParam(defaultValue = "") String experience,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        Page<JobDto> jobs = service.getJobs(title, location, company, experience, page, size, sortBy, sortDir);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public Job get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Job create(@RequestBody Job job) {
        return service.create(job);
    }

    @PutMapping("/{id}")
    public Job update(@PathVariable Long id, @RequestBody Job job) {
        return service.update(id, job);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
