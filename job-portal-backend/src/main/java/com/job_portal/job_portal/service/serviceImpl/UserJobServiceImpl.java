package com.job_portal.job_portal.service.serviceImpl;

import com.job_portal.job_portal.exception.BadRequestException;
import com.job_portal.job_portal.exception.ResourceNotFoundException;
import com.job_portal.job_portal.model.Application;
import com.job_portal.job_portal.model.Job;
import com.job_portal.job_portal.model.SavedJob;
import com.job_portal.job_portal.model.User;
import com.job_portal.job_portal.repository.ApplicationRepository;
import com.job_portal.job_portal.repository.JobRepository;
import com.job_portal.job_portal.repository.SavedJobRepository;
import com.job_portal.job_portal.repository.UserRepository;
import com.job_portal.job_portal.service.UserJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class UserJobServiceImpl implements UserJobService {

    private final UserRepository userRepo;
    private final JobRepository  jobRepo;
    private final SavedJobRepository savedRepo;
    private final ApplicationRepository appRepo;

    /* ---- helpers ---- */
    private User user(Long id) { return userRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User "+id+" not found")); }
    private Job  job(Long id)  { return  jobRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Job "+id+" not found")); }

    /* ---------- saved ---------- */
    @Override
    public void saveJob(Long uid, Long jid) {
        if (savedRepo.existsByUserIdAndJobId(uid, jid))
            throw new BadRequestException("Job already saved");
        savedRepo.save(SavedJob.builder()
                .user(user(uid)).job(job(jid)).build());
    }

    @Override
    public void unsaveJob(Long uid, Long jid) {
        if (!savedRepo.existsByUserIdAndJobId(uid, jid))
            throw new ResourceNotFoundException("Saved job not found");
        savedRepo.deleteByUserIdAndJobId(uid, jid);
    }

    @Override
    public List<Job> listSaved(Long uid) {
        return savedRepo.findByUserId(uid).stream()
                .map(SavedJob::getJob).toList();
    }

    /* ---------- applied ---------- */
    @Override
    public void apply(Long uid, Long jid) {
        if (appRepo.existsByUserIdAndJobId(uid, jid))
            throw new BadRequestException("Job already applied");
        appRepo.save(Application.builder()
                .user(user(uid)).job(job(jid)).build());
    }

    @Override
    public List<Job> listApplied(Long uid) {
        return appRepo.findByUserId(uid).stream()
                .map(Application::getJob).toList();
    }
}
