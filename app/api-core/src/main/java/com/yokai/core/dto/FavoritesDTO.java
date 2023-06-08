package com.yokai.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class FavoritesDTO {
    private Integer favoritesId;
    private Integer userId;
    private String  vendingMachineId;
    private String  locationName;
}