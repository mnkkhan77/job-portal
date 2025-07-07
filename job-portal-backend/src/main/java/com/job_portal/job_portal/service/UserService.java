package com.job_portal.job_portal.service;

import com.job_portal.job_portal.dto.UserCreateDto;
import com.job_portal.job_portal.dto.UserDto;
import com.job_portal.job_portal.dto.UserUpdateDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    Page<UserDto> list(Pageable pageable);

    UserDto get(Long id);

    UserDto getByUsername(String username);     //  ←  add this line

    UserDto create(UserCreateDto dto);

    UserDto update(Long id, UserUpdateDto dto);

    void delete(Long id);

    void changePassword(Long userId, String oldPwd, String newPwd);
}