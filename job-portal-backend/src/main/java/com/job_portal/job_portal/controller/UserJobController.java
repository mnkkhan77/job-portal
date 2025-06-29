package com.job_portal.job_portal.controller;

import com.job_portal.job_portal.dto.JobBriefDto;
import com.job_portal.job_portal.service.UserJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users/{uid}")
@RequiredArgsConstructor
public class UserJobController {

    private final UserJobService svc;

    /* ---------- SAVED ---------- */
    @PostMapping("/saved/{jobId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveJob(@PathVariable Long uid, @PathVariable Long jobId) {
        svc.saveJob(uid, jobId);
    }

    @DeleteMapping("/saved/{jobId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void unsaveJob(@PathVariable Long uid, @PathVariable Long jobId) {
        svc.unsaveJob(uid, jobId);
    }

    @GetMapping("/saved")
    public List<JobBriefDto> listSaved(@PathVariable Long uid) {
        return svc.listSaved(uid).stream()
                .map(JobBriefDto::from)
                .collect(Collectors.toList());
    }

    /* ---------- APPLIED ---------- */
    @PostMapping("/applied/{jobId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void apply(@PathVariable Long uid, @PathVariable Long jobId) {
        svc.apply(uid, jobId);
    }

    @GetMapping("/applied")
    public List<JobBriefDto> listApplied(@PathVariable Long uid) {
        return svc.listApplied(uid).stream()
                .map(JobBriefDto::from)
                .collect(Collectors.toList());
    }
}