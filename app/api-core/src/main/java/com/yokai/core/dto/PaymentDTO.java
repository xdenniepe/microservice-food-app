package com.yokai.core.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PaymentDTO {
    private Integer paymentId;
    private String piPaymenType;
    private String piTransactionOrigin;
    private String piCardType;
    private String piCardholderName;
    private String piCreditCardNumber;
    private String piExpirationDate;
    private String piAccountType;
    private String piCountryIssuance;
    private String tiMerchant;
    private String tiMerchantAccount;
    private String tiTransactionType;
    private String tiAmount;
    private String tiTransactionDate;
    private String tiStatus;
    private String tiSettlementBatch;
    private String tiProcessorAuthorizationCode; 
}
