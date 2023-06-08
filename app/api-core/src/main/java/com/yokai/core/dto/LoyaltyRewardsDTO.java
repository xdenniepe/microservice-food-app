package com.yokai.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class LoyaltyRewardsDTO {
    private Integer loyaltyRewardId;
    private Integer percent;
    private Integer  loyaltyRewardPoints;
    private String  UniqueKey;
    private Integer  tierNumber;
}