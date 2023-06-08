package com.yokai.order.entity;

import javax.persistence.*;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product_order")
public class ProductOrder extends AbstractEntity implements IEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "product_order_id")
  private Integer productOrderId;

  @Column(name = "quantity")
  private Integer quantity;

  @Column(name = "product_id")
  private Integer productId;

  @Column(name = "vending_machine_id")
  private String vendingMachineId;

  @ManyToOne
  @JoinColumn(name="order_id")
  private Order order;	
}
