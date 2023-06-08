package com.yokai.order.entity.projection;

import com.yokai.order.entity.Order;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withId", types = { Order.class }) 
interface OrderProjection { 

    Integer getOrderId();
    Integer getUserId();
    Integer getQuantity();
    Integer getTotalCost();
    
}