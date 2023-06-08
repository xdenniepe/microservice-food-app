package com.yokai.payment.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "transaction_item")
public class TransactionItem extends AbstractEntity implements IEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_item_id")
    private Integer transactionItemId;

    @Column(name = "product_id")
    private Integer productId;
    
    @Column(name = "item_description")
    private String itemDescription;

    @Column(name = "item_price")
    private Double itemPrice;

    @Column(name = "item_quantity")
    private Integer itemQuantity;

    @Column(name = "item_tax")
    private Double itemTax;

    @Column(name = "item_total_cost")
    private Double itemTotalCost;

    @ManyToOne
    @JoinColumn(name="transaction_id")
    private Transaction transaction;	
}
