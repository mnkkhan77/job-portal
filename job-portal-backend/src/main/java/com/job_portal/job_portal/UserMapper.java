package com.job_portal.job_portal;

import com.job_portal.job_portal.dto.UserCreateDto;
import com.job_portal.job_portal.dto.UserDto;
import com.job_portal.job_portal.model.User;

public class UserMapper {

    /* Entity -> DTO for responses */
    public static UserDto toDto(User u) {
        return UserDto.builder()
                .id(u.getId())
                .username(u.getUsername())
                .email(u.getEmail())
                .role(u.getRole())
                .build();
    }

    /* Create DTO -> Entity */
    public static User toEntity(UserCreateDto d) {
        return User.builder()
                .username(d.getUsername())
                .email(d.getEmail())
                .password(d.getPassword())
                .role(d.getRole())
                .build();
    }
}