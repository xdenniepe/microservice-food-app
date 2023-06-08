package com.yokai.core.dto;

import java.util.List;

import lombok.*;

@Data
public class InvoicePdfDTO {
    private PaymentDTO paymentInfo;
    private TransactionDTO transaction;
    private List<CartItemDTO> items;
    private Double discount;
    private String coupon;
    private String transactionDate;
}
