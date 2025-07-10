package com.job_portal.job_portal.dto;

public record JobCreateDto(
        String title,
        String company,
        String location,
        Integer experience,
        Integer minSalary,
        Integer maxSalary,
        String description
) {}
