package com.yokai.payment.apiservice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.yokai.core.dto.CartItemDTO;
import com.yokai.core.dto.OrderDTO;
import com.yokai.core.enumerated.OrderStatusEnum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class OrderApiService {
    
    @Autowired
    @Qualifier("order")
    private WebClient orderClient;

    public List<CartItemDTO> getCartItems(String token, int userId) {
        return orderClient.get().uri(uriBuilder -> uriBuilder.path("/api/cart/items")
                                                             .queryParam("userId", userId).build())
                                .header(HttpHeaders.AUTHORIZATION, token)
                                .retrieve()
                                .bodyToMono(new ParameterizedTypeReference<List<CartItemDTO>>() {})
                                .block();

    }

    public List<CartItemDTO> getInvoiceData(String token, int orderId) {
        return orderClient.get().uri(uriBuilder -> uriBuilder.path("/api/cart/items/findByOrderId")
                                                             .queryParam("orderId", orderId).build())
                                .header(HttpHeaders.AUTHORIZATION, token)
                                .retrieve()
                                .bodyToMono(new ParameterizedTypeReference<List<CartItemDTO>>() {})
                                .block();

    }

    public OrderDTO updateOrder(String token, int orderId) {
        Map<String, String> payload = new HashMap<>();
        payload.put("status", OrderStatusEnum.COMPLETE.name());

        return orderClient.patch().uri(uriBuilder -> uriBuilder.path("/api/orders/{orderId}").build(orderId))
                                  .contentType(MediaType.APPLICATION_JSON)
                                  .body(BodyInserters.fromValue(payload))
                                  .header(HttpHeaders.AUTHORIZATION, token)
                                  .retrieve()
                                  .bodyToMono(OrderDTO.class)
                                  .block();                    
    }
}
