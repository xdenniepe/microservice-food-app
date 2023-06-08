package com.yokai.core.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VmLocationDTO {

    private Integer vmLocationId;
    private String address;
    private String vendingMachineId;
    private Double lat;
    private Double lng;
    private String locationName;
    private String status;

}
