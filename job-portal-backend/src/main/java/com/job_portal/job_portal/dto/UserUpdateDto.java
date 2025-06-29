package com.job_portal.job_portal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateDto {
    @NotBlank
    private String username;
    @NotBlank
    @Email
    private String email;
    private String role;               // optional change
    private String password;           // optional change
}
