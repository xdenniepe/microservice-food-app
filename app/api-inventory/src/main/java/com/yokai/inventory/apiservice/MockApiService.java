package com.yokai.inventory.apiservice;

import java.util.List;
import java.util.Optional;

import com.yokai.core.dto.ProductDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class MockApiService {

    @Autowired
    @Qualifier("mock")
    WebClient mockClient;

    public List<ProductDTO> getProducts(String vendingMachineId) {
        return  mockClient.get().uri(uriBuilder -> uriBuilder.path("/api/products")
                                                             .queryParam("id", vendingMachineId).build())
                                .retrieve()
                                .bodyToMono(new ParameterizedTypeReference<List<ProductDTO>>() {})
                                .block();   
    }

    public Optional<ProductDTO> getProductById(Integer productId) {
        return  mockClient.get().uri(uriBuilder -> uriBuilder.path("/api/products/findByProductId")
                                                             .queryParam("id", productId).build())
                                .retrieve()
                                .bodyToMono(new ParameterizedTypeReference<Optional<ProductDTO>>() {})
                                .block();   
    }

    public String purchase(String vendingMachineId, List<ProductDTO> products) {
        return mockClient.post().uri(uriBuilder -> uriBuilder.path("/api/products/purchase")
                                                             .queryParam("id", vendingMachineId).build())
                                .body(Mono.just(products), new ParameterizedTypeReference<List<ProductDTO>>() {})
                                .retrieve()
                                .bodyToMono(String.class)
                                .block();
    }


}
