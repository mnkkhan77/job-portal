package com.job_portal.job_portal.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "job_id"}))
public class SavedJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;
    @ManyToOne(optional = false)
    private Job job;

    private LocalDateTime savedAt;

}