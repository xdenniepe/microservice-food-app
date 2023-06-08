package com.yokai.payment.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Arrays;

import com.braintreegateway.*;
import com.yokai.core.dto.PaymentDTO;
import com.yokai.payment.PaymentApplication;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.slf4j.Slf4j;

import com.braintreegateway.Transaction.Status;

@RestController
@RequestMapping(path = "/api/braintree")
@Slf4j
public class CheckoutController {
    private final BraintreeGateway gateway = PaymentApplication.gateway;

     private final Status[] TRANSACTION_SUCCESS_STATUSES = new Status[] {
        Transaction.Status.AUTHORIZED,
        Transaction.Status.AUTHORIZING,
        Transaction.Status.SETTLED,
        Transaction.Status.SETTLEMENT_CONFIRMED,
        Transaction.Status.SETTLEMENT_PENDING,
        Transaction.Status.SETTLING,
        Transaction.Status.SUBMITTED_FOR_SETTLEMENT
     };

     @GetMapping("/")
    public String root(Model model) {
        return "redirect:checkouts";
    }

    @GetMapping("/checkouts")
    public String checkout(Model model) {
        String clientToken = gateway.clientToken().generate();
        model.addAttribute("clientToken", clientToken);

        return "checkouts/new";
    }

    // Receive a payment method nonce from your client
    // Create a transaction
    @PostMapping("/checkouts")
    public ResponseEntity<Object> postForm(@RequestParam("amount") Double amount, @RequestParam("payment_method_nonce") String nonce, Model model, final RedirectAttributes redirectAttributes) {
        PaymentDTO paymentDTO = new PaymentDTO();
        BigDecimal decimalAmount;
        
        try {
            decimalAmount = BigDecimal.valueOf(amount);
        } catch (NumberFormatException e) {
            redirectAttributes.addFlashAttribute("errorDetails", "Error: 81503: Amount is an invalid format.");

            // return "redirect:checkouts";
            return new ResponseEntity<>(redirectAttributes, HttpStatus.BAD_REQUEST);
        }

        TransactionRequest request = new TransactionRequest()
            .amount(decimalAmount)
            .paymentMethodNonce(nonce)
            .options()
                .submitForSettlement(true)
                .done();

        Result<Transaction> result = gateway.transaction().sale(request);

        if (result.isSuccess()) {
            Transaction transaction = result.getTarget();
            log.info("transaction success: {}, {}, {}", transaction.getId(), transaction.getStatus(), transaction.getAmount());
            
            // return "redirect:checkouts/" + transaction.getId();
            // JSONObject responseJsonObject = new JSONObject();
            CreditCard creditCard;
            Customer customer;
            
            paymentDTO.setPiAccountType(transaction.getPaymentInstrumentType());
            paymentDTO.setPiCardType(transaction.getCreditCard().getCardType());
            paymentDTO.setPiExpirationDate(transaction.getCreditCard().getExpirationDate());
            paymentDTO.setPiPaymenType(transaction.getCreditCard().getAccountType());
            paymentDTO.setPiCountryIssuance(transaction.getCreditCard().getCountryOfIssuance());

            paymentDTO.setTiAmount(transaction.getAmount() + "");

            try {
                transaction = gateway.transaction().find(transaction.getId());
                creditCard = transaction.getCreditCard();
                customer = transaction.getCustomer();
            } catch (Exception e) {
                e.printStackTrace();
                log.info("redirect:/checkouts");
                return null;
            }

            paymentDTO.setPiCardholderName(transaction.getCreditCard().getCardholderName());
            paymentDTO.setPiCreditCardNumber(creditCard.getMaskedNumber());
            paymentDTO.setTiMerchantAccount(transaction.getMerchantAccountId());
            paymentDTO.setTiTransactionType(transaction.getType() + "");
           
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
	        String createdAt = sdf.format(transaction.getCreatedAt().getTime()); 
        
            paymentDTO.setTiTransactionDate(createdAt);
            paymentDTO.setTiStatus(transaction.getStatus() + "");
            paymentDTO.setTiSettlementBatch(transaction.getSettlementBatchId());
            paymentDTO.setTiProcessorAuthorizationCode(transaction.getProcessorAuthorizationCode());

            // send
            return new ResponseEntity<>(paymentDTO, HttpStatus.OK);

        } else if (result.getTransaction() != null) {
            Transaction transaction = result.getTransaction();
            log.info("transaction !success: {}", transaction);

            // return "redirect:checkouts/" + transaction.getId();
            return new ResponseEntity<>(transaction, HttpStatus.OK);

        } else {
            StringBuilder errorString = new StringBuilder();
            for (ValidationError error : result.getErrors().getAllDeepValidationErrors()) {
               errorString.append("Error: ").append(error.getCode()).append(": ").append(error.getMessage()).append("\n");
            }
            redirectAttributes.addFlashAttribute("errorDetails", errorString.toString());
            log.info("redirect attribs: {}", redirectAttributes);

            // return "redirect:checkouts";
            return new ResponseEntity<>(redirectAttributes, HttpStatus.BAD_REQUEST);
        }
    }

    // @GetMapping("/checkouts/{transactionId}")
    public Model getTransaction(@PathVariable String transactionId, Model model) {
        Transaction transaction;
        CreditCard creditCard;
        Customer customer;

        try {
            transaction = gateway.transaction().find(transactionId);
            creditCard = transaction.getCreditCard();
            customer = transaction.getCustomer();
        } catch (Exception e) {
            System.out.println("Exception: " + e);
            log.info("redirect:/checkouts");
            return null;
        }

        model.addAttribute("isSuccess", Arrays.asList(TRANSACTION_SUCCESS_STATUSES).contains(transaction.getStatus()));
        model.addAttribute("transaction", transaction);
        model.addAttribute("creditCard", creditCard);
        model.addAttribute("customer", customer);

        log.info("model/ transaction -- {}", model);

        // return "checkouts/show";
        // return new ResponseEntity<>(model, HttpStatus.OK);
        return model;
    }
}
