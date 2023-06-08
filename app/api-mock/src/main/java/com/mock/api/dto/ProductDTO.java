package com.mock.api.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDTO {

    private Integer productId;
	private String vendingMachineId;
	private String name;
	private Double price;
	private String description;
	private Integer quantity;
	private String info;	
	private String image;
	private String status;
}