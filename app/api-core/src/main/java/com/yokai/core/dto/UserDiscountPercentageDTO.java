package com.yokai.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UserDiscountPercentageDTO {
    private Integer discountId;
    private Integer userId;
    private Integer  percentage;
}