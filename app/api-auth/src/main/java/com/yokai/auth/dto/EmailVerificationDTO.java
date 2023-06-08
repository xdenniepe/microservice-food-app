package com.yokai.auth.dto;

import lombok.Data;

@Data
public class EmailVerificationDTO {
    private String email;
    private String phoneNumber;
    private String baseUrl;
}
