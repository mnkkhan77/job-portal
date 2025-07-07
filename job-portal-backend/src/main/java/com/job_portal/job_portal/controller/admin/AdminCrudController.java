package com.job_portal.job_portal.controller.admin;

import com.job_portal.job_portal.dto.UserDto;
import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.model.User;
import com.job_portal.job_portal.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController              // ───────────────────────────────────────────────
@RequestMapping("/api/admin") // every route below starts with /api/admin/…
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")   // ← gate **once** for the whole class
public class AdminCrudController {

    private final AdminService svc;

    /* ──────────────── JOBS ──────────────── */

    @GetMapping("/jobs")
    public List<Job> listJobs() { return svc.listJobs(); }

    @GetMapping("/jobs/{id}")
    public Job getJob(@PathVariable Long id) { return svc.getJob(id); }

    @PostMapping("/jobs")
    @ResponseStatus(HttpStatus.CREATED)
    public Job createJob(@RequestBody Job job) { return svc.createJob(job); }

    @PutMapping("/jobs/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job job) {
        return svc.updateJob(id, job);
    }

    @DeleteMapping("/jobs/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteJob(@PathVariable Long id) { svc.deleteJob(id); }

    /* ──────────────── USERS ─────────────── */

    @GetMapping("/users")
    public List<UserDto> listUsers() { return svc.listUsers(); }

    @GetMapping("/users/{id}")
    public UserDto getUser(@PathVariable Long id) { return svc.getUser(id); }

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto createUser(@RequestBody User user) { return svc.createUser(user); }

    @PutMapping("/users/{id}")
    public UserDto updateUser(@PathVariable Long id, @RequestBody User user) {
        return svc.updateUser(id, user);
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) { svc.deleteUser(id); }
}
