package com.yokai.core.dto;

import java.util.UUID;

import com.yokai.core.enumerated.CartItemStatusEnum;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemDTO  {
    
    private UUID uuid;
	private Integer productId;
    private Integer orderId;
	private Integer productOrderId;
	private Integer quantity;
	private String image;
	private String name;
	private String description;
	private String vendorMachineId;
	private Double price;
	private Double subtotal;
	private Double tax;
	private Double total;
	private CartItemStatusEnum status;

}
