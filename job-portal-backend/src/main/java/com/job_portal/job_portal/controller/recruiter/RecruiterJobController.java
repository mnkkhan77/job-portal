package com.job_portal.job_portal.controller.recruiter;

import com.job_portal.job_portal.dto.JobDto;
import com.job_portal.job_portal.security.MyUserDetails;
import com.job_portal.job_portal.service.RecruiterJobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter/jobs")
@RequiredArgsConstructor
public class RecruiterJobController {

    private final RecruiterJobService svc;

    /* ───────── LIST OWN JOBS ───────── */
    @GetMapping
    public List<JobDto> listMyJobs(@AuthenticationPrincipal MyUserDetails principal) {
        Long recruiterId = principal.getId();    // <- comes from MyUserDetails
        return svc.listOwn(recruiterId);
    }

    /* ───────── CREATE ───────── */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public JobDto create(@AuthenticationPrincipal MyUserDetails principal,
                         @RequestBody @Valid JobDto dto) {

        Long recruiterId = principal.getId();
        return svc.create(recruiterId, dto);
    }

    /* ───────── UPDATE ───────── */
    @PutMapping("/{id}")
    public JobDto update(@AuthenticationPrincipal MyUserDetails principle,
                         @PathVariable Long id,
                         @RequestBody JobDto dto) {
        Long recruiterId = principle.getId();
        return svc.update(recruiterId, id, dto);
    }

    /* ───────── DELETE ───────── */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal MyUserDetails principle,
                       @PathVariable Long id) {
        Long recruiterId = principle.getId();
        svc.delete(recruiterId, id);
    }
}
