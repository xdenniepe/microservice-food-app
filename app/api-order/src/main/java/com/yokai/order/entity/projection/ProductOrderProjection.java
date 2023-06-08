package com.yokai.order.entity.projection;

import com.yokai.order.entity.ProductOrder;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withId", types = { ProductOrder.class }) 
interface ProductOrderProjection { 
    Integer getProductOrderId();
    Integer getQuantity();
    Double  getPrice();
}
