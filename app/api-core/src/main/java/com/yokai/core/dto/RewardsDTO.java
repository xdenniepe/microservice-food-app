package com.yokai.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class RewardsDTO {
    private Integer rewardsId;
    private Integer  userId;
    private Integer  percentage;
    private String  status;
    private String uniqueKey;
    private String  source;
}