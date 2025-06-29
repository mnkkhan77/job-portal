package com.job_portal.job_portal.exception;


import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

class GlobalExceptionHandlerTest {

    GlobalExceptionHandler h = new GlobalExceptionHandler();

    @Test
    void badRequest_maps_to_400() {
        ResponseEntity<?> res =
                h.handleBadRequest(new BadRequestException("bad"));
        assertThat(res.getStatusCodeValue()).isEqualTo(400);
    }
}
