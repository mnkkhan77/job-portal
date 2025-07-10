package com.job_portal.job_portal.controller.user;

import com.job_portal.job_portal.dto.JobBriefDto;
import com.job_portal.job_portal.dto.UserDto;
import com.job_portal.job_portal.dto.UserUpdateDto;
import com.job_portal.job_portal.model.User;
import com.job_portal.job_portal.security.MyUserDetails;
import com.job_portal.job_portal.service.UserJobService;
import com.job_portal.job_portal.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserJobController {

    private final UserJobService svc;
    private final UserService userService;

    /* ─────────────────── USER INFO ─────────────────── */

    /**
     * GET /api/users/me → return the currently logged-in user's info
     */
    @GetMapping("/me")
    public MyUserDetails getCurrentUser(Authentication auth) {
        return (MyUserDetails) auth.getPrincipal();
    }

    /* ─────────────────── UPDATE USER INFO ─────────────────── */

    /**
     * PUT /api/users/me → update the user's info
     */
    @PutMapping("/me")
    public UserDto update(@AuthenticationPrincipal MyUserDetails userDetails,
                          @RequestBody @Valid UserUpdateDto dto) {
        Long id = userDetails.getId();
        return userService.update(id, dto);
    }

    /* ─────────────────── SAVED JOBS ─────────────────── */

    /**
     * POST /api/users/saved/{jobId}  → 201 Created
     */
    @PostMapping("/saved/{jobId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveJob(Authentication auth, @PathVariable Long jobId) {
        MyUserDetails principal = (MyUserDetails) auth.getPrincipal();
        svc.saveJob(principal.getId(), jobId);
    }

    /**
     * DELETE /api/users/saved/{jobId}  → 204 No Content
     */
    @DeleteMapping("/saved/{jobId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void unsaveJob(Authentication auth, @PathVariable Long jobId) {
        MyUserDetails principal = (MyUserDetails) auth.getPrincipal();
        svc.unsaveJob(principal.getId(), jobId);
    }

    /**
     * GET /api/users/saved → List saved jobs
     */
    @GetMapping("/saved")
    public List<JobBriefDto> listSaved(
            @AuthenticationPrincipal(expression = "user") User user
    ) {
        return svc.listSaved(user.getId())
                .stream()
                .map(JobBriefDto::from)
                .toList();
    }

    /* ─────────────────── APPLIED JOBS ─────────────────── */

    /**
     * POST /api/users/applied/{jobId}  → 201 Created
     */
    @PostMapping("/applied/{jobId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void apply(Authentication auth, @PathVariable Long jobId) {
        MyUserDetails principal = (MyUserDetails) auth.getPrincipal();
        svc.apply(principal.getId(), jobId);
    }

    /**
     * GET /api/users/applied → List applied jobs
     */
    @GetMapping("/applied")
    public List<JobBriefDto> listApplied(
            @AuthenticationPrincipal(expression = "user") User user   // ⬅️ same here
    ) {
        return svc.listApplied(user.getId())
                .stream()
                .map(JobBriefDto::from)
                .toList();
    }

    /**
     * Delete /api/users/applied/{jobId} → Delete applied job
     */
    @DeleteMapping("/applied/{jobId}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(Authentication auth, @PathVariable Long jobId) {
        MyUserDetails principal = (MyUserDetails) auth.getPrincipal();
        svc.delete(principal.getId(), jobId);
    }
}
