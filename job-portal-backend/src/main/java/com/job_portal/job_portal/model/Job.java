package com.job_portal.job_portal.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.URL;

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
    private Integer experience;
    @Column(nullable = false)
    private Integer minSalary;
    @Column(nullable = false)
    private Integer maxSalary;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "posted_by")
    private User postedBy;

    @Column(length = 1000)
    @URL
    private String jobLink;
}