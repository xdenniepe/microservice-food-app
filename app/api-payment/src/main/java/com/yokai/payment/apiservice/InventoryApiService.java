package com.yokai.payment.apiservice;

import java.util.List;

import com.yokai.core.dto.ProductDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class InventoryApiService {

    @Autowired
    @Qualifier("inventory")
    private WebClient inventoryClient;
    
    public String purchase(String vendingMachineId, List<ProductDTO> products) {
        return inventoryClient.post().uri(uriBuilder -> uriBuilder.path("/api/products/purchase")
                                                                  .queryParam("id", vendingMachineId).build())
                                     .body(Mono.just(products), new ParameterizedTypeReference<List<ProductDTO>>() {})
                                     .retrieve().bodyToMono(String.class)
                                     .block();  
    }


   public List<ProductDTO> getProducts(String vendingMachineId) {
       return  inventoryClient.get().uri(uriBuilder -> uriBuilder.path("/api/products")
                                                                 .queryParam("id", vendingMachineId).build())
                                    .retrieve()
                                    .bodyToMono(new ParameterizedTypeReference<List<ProductDTO>>() {})
                                    .block();      
   }
}
