package com.yokai.core.dto;

import lombok.*;

@Data
public class ReceiptItemsDTO {
    private Integer productId;
    private Integer quantity;
    private Double totalCost;
}

