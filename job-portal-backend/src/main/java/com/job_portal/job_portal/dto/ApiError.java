package com.job_portal.job_portal.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ApiError {
    private LocalDateTime timestamp;
    private int     status;
    private String  error;        // reason phrase
    private String  message;      // developer / user message
    private String  path;         // request URI
    private List<String> details; // optional (e.g. validation errors)
}
