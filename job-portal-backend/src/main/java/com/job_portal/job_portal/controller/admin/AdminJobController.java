package com.job_portal.job_portal.controller.admin;

import com.job_portal.job_portal.dto.JobCreateDto;
import com.job_portal.job_portal.dto.JobDto;
import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.security.MyUserDetails;
import com.job_portal.job_portal.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/jobs")
@RequiredArgsConstructor
public class AdminJobController {
    private final AdminService svc;

    /* ──────────────── JOBS ──────────────── */

    @GetMapping
    public List<JobDto> listJobs() {
        return svc.listJobs();
    }

    @GetMapping("/{id}")
    public Job getJob(@PathVariable Long id) {
        return svc.getJob(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public JobDto createJob(@RequestBody JobCreateDto dto,
                            @AuthenticationPrincipal MyUserDetails userDetails) {
        Job saved = svc.createJob(dto, userDetails.getUser());
        return JobDto.from(saved);
    }


    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id,
                         @RequestBody JobCreateDto dto,
                         @AuthenticationPrincipal MyUserDetails ud) {
        return svc.updateJob(id, dto, ud.getUser());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteJob(@PathVariable Long id,
                          @AuthenticationPrincipal MyUserDetails ud) {
        svc.deleteJob(id, ud.getUser());
    }

}
