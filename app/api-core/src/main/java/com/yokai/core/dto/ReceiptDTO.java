package com.yokai.core.dto;

import java.util.List;

import lombok.*;

@Getter
@Setter
public class ReceiptDTO {
    private Integer orderId;
    private Integer userId;
    private Double subtotal;
    private Double fees;
    private Double total;
    private InvoicePdfDTO invoicePdf;
    // private List<ReceiptItemsDTO> transactionItems; 
} 