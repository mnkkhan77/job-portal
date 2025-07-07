package com.job_portal.job_portal.controller.user;

import com.job_portal.job_portal.dto.ChangePasswordRequest;
import com.job_portal.job_portal.dto.UserCreateDto;
import com.job_portal.job_portal.dto.UserDto;
import com.job_portal.job_portal.dto.UserUpdateDto;
import com.job_portal.job_portal.security.MyUserDetails;
import com.job_portal.job_portal.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping
    public Page<UserDto> list(Pageable pageable) {
        return service.list(pageable);
    }

    @GetMapping("/{id}")
    public UserDto get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto create(@RequestBody @Valid UserCreateDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public UserDto update(@PathVariable Long id,
                          @RequestBody @Valid UserUpdateDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping("/change-password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(
            @AuthenticationPrincipal MyUserDetails user,
            @Valid @RequestBody ChangePasswordRequest req
    ) {
        service.changePassword(user.getId(), req.getOldPassword(), req.getNewPassword());
    }
}