package com.yokai.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class VerificationDTO {
    private Integer verificationId;
    private Integer userId;
    private String code;
    private String type;
    private Long expiration;
    private String status;
    private Long dateDeleted;
}