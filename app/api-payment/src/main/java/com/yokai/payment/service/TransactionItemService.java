package com.yokai.payment.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.yokai.core.dto.CartItemDTO;
import com.yokai.payment.entity.Transaction;
import com.yokai.payment.entity.TransactionItem;

import org.springframework.stereotype.Service;

@Service
public class TransactionItemService {
    
    public List<TransactionItem> cartItemsToTransactionItems(List<CartItemDTO> cartItems, int userId, Transaction transaction) {
        return  cartItems.stream().map(i -> {
            TransactionItem tmp = new TransactionItem();
            tmp.setProductId(i.getProductId());
            tmp.setItemDescription(i.getDescription());
            tmp.setItemPrice(i.getPrice());
            tmp.setItemQuantity(i.getQuantity());
            tmp.setItemTax(i.getTax());
            tmp.setItemTotalCost(i.getTotal());
            tmp.setTransaction(transaction);
            tmp.setWhoAdded(userId);
            tmp.setWhenAdded( (int) (new Date().getTime()/ 1000));
            return tmp;
        }).collect(Collectors.toList());
    }
}
