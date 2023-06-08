package com.yokai.payment.controller.request;

import com.yokai.core.dto.InvoicePdfDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckOutRequest {
    Integer orderId;
    String paymentMethod;
    String couponCode;
    InvoicePdfDTO invoicePdf;
}
