package com.job_portal.job_portal.dto;

import com.job_portal.job_portal.model.Job;
import lombok.*;

@Getter               // <-- add this (or @Data)
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobDto {

    private Long id;
    private String title;
    private String company;
    private String location;     // onsite | remote | hybrid
    private Integer experience;  // years
    private Integer minSalary;
    private Integer maxSalary;
    private String description;
    Long postedBy;

    /* mapping helpers */
    public static JobDto from(Job j){
        return JobDto.builder()
                .id(j.getId())
                .title(j.getTitle())
                .company(j.getCompany())
                .location(j.getLocation())
                .experience(j.getExperience())
                .minSalary(j.getMinSalary())
                .maxSalary(j.getMaxSalary())
                .description(j.getDescription())
                .postedBy(j.getPostedBy() != null ? j.getPostedBy().getId() : null)
                .build();
    }

    public static Job toEntity(JobDto dto){
        return Job.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .company(dto.getCompany())
                .location(dto.getLocation())
                .experience(dto.getExperience())
                .minSalary(dto.getMinSalary())
                .maxSalary(dto.getMaxSalary())
                .description(dto.getDescription())
                .build();
    }
}