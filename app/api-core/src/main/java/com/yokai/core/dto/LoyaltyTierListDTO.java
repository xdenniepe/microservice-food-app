package com.yokai.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data

//table where admin can dynamically change loyalty settings
public class LoyaltyTierListDTO {
    private Integer tierListId;
    private String tierName;
    private String  tierColor;
    private Integer  tierLowestMoneySpent;
    private Integer  tierHighestMoneySpent;
    private Integer  tierPromotionPercentage;
}