package com.yokai.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data

//table where the money total spent of user is counted 
public class CustomerTotalMoneySpentDTO {
    private Integer customerTotalMoneySpentId;
    private Integer userId;
    private Integer  totalSpending;
}