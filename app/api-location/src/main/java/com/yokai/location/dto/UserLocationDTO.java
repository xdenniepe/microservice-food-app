package com.yokai.location.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLocationDTO {

    private Integer userDefaultLocationId;
    private Integer userId;
    private String vendingMachineId;
    private String address;

}
