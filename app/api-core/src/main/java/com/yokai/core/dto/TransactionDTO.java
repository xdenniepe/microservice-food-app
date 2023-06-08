package com.yokai.core.dto;

import lombok.*;

@Data
public class TransactionDTO {
    private Integer userId;
    private Integer couponId;
    private Integer orderId;
    private String code;
    private Double subtotal;
    private Double total;
    private Double fees;
    private Integer timestamp;
}
