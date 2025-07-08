package com.job_portal.job_portal.dto;

import com.job_portal.job_portal.model.Job;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobDto {
    private Long id;
    private String title;
    private String company;
    private String location;
    private String experience;
    private Integer minSalary;
    private Integer maxSalary;

    public static JobDto from(Job job) {
        return JobDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .location(job.getLocation())
                .experience(job.getExperience())
                .minSalary(job.getMinSalary())
                .maxSalary(job.getMaxSalary())
                .build();
    }
}

