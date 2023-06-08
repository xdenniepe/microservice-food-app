package com.yokai.order.event;

import com.yokai.core.enumerated.OrderStatusEnum;
import com.yokai.order.entity.Order;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;



@RepositoryEventHandler(Order.class) 
public class OrderEventHandler {

    @HandleBeforeCreate
    public void handleProductOrderAfterCreate(Order order){
        order.setStatus(OrderStatusEnum.PENDING);
    }
}
