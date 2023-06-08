package com.yokai.order.apiservice;

import java.util.List;

import com.yokai.core.dto.ProductDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class InventoryApiService {

    @Autowired
    @Qualifier("inventory")
    WebClient inventoryClient;

    public List<ProductDTO> getProducts(String vendingMachineId) {
        return  inventoryClient.get().uri(uriBuilder -> uriBuilder.path("/api/products")
                                                                  .queryParam("id", vendingMachineId).build())
                                     .retrieve()
                                     .bodyToMono(new ParameterizedTypeReference<List<ProductDTO>>() {}).block();      
    }
}
