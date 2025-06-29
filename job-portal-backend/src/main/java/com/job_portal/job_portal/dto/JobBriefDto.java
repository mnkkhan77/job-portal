package com.job_portal.job_portal.dto;

import com.job_portal.job_portal.model.Job;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobBriefDto {
    private Long id;
    private String title;
    private String company;
    private String location;

    public static JobBriefDto from(Job j) {
        return JobBriefDto.builder()
                .id(j.getId())
                .title(j.getTitle())
                .company(j.getCompany())
                .location(j.getLocation())
                .build();
    }
}