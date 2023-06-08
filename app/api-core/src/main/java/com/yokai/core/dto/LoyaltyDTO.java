package com.yokai.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class LoyaltyDTO {
    private Integer loyaltyId;
    private Integer userId;
    private Integer  points;
}