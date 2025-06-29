package com.job_portal.job_portal.service.serviceImpl;

import com.job_portal.job_portal.UserMapper;
import com.job_portal.job_portal.dto.UserCreateDto;
import com.job_portal.job_portal.dto.UserDto;
import com.job_portal.job_portal.dto.UserUpdateDto;
import com.job_portal.job_portal.exception.BadRequestException;
import com.job_portal.job_portal.exception.ResourceNotFoundException;
import com.job_portal.job_portal.model.User;
import com.job_portal.job_portal.repository.UserRepository;
import com.job_portal.job_portal.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public Page<UserDto> list(Pageable pageable) {
        return repo.findAll(pageable).map(UserMapper::toDto);
    }

    @Override
    public UserDto get(Long id) {
        return repo.findById(id)
                .map(UserMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("User " + id + " not found"));
    }

    @Override
    public UserDto create(UserCreateDto dto) {
        if (repo.existsByUsername(dto.getUsername()))
            throw new BadRequestException("Username already taken");
        if (repo.existsByEmail(dto.getEmail()))
            throw new BadRequestException("Email already taken");

        User u = UserMapper.toEntity(dto);
        u.setPassword(encoder.encode(dto.getPassword()));
        return UserMapper.toDto(repo.save(u));
    }

    @Override
    public UserDto update(Long id, UserUpdateDto dto) {
        User u = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User " + id + " not found"));

        u.setUsername(dto.getUsername());
        u.setEmail(dto.getEmail());
        if (dto.getRole() != null) u.setRole(dto.getRole());
        if (dto.getPassword() != null && !dto.getPassword().isBlank())
            u.setPassword(encoder.encode(dto.getPassword()));

        return UserMapper.toDto(repo.save(u));
    }

    @Override
    public void delete(Long id) {
        if (!repo.existsById(id))
            throw new ResourceNotFoundException("User " + id + " not found");
        repo.deleteById(id);
    }

    @Override
    public UserDto getByUsername(String username) {
        return repo.findByUsername(username)
                .map(UserMapper::toDto)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User " + username + " not found"));
    }
}