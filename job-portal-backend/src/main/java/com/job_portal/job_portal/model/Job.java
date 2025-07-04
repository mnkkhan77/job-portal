package com.job_portal.job_portal.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String company;
    @Column(nullable = false)
    private String location;
    @Column(nullable = false)
    private String experience;   // e.g. "2+ years"
    @Column(nullable = false)
    private Integer minSalary;
    @Column(nullable = false)
    private Integer maxSalary;

    @Lob
    private String description;
}