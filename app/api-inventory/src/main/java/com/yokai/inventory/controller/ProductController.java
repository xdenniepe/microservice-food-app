package com.yokai.inventory.controller;

import java.util.List;
import javax.transaction.Transactional;
import java.util.Optional;

import com.yokai.core.dto.ProductDTO;
import com.yokai.inventory.apiservice.MockApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {


    @Autowired
    private MockApiService mockApiService;
    
    @GetMapping("/api/products")
    @Transactional
    public ResponseEntity<Object> getProducts(@RequestParam("id") String vendingMachineId) {
        List<ProductDTO> products = mockApiService.getProducts(vendingMachineId);

        if(products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/api/products/findById")
    @Transactional
    public ResponseEntity<Object> getProducts(@RequestParam("productId") Integer productId) {
        Optional<ProductDTO> product = mockApiService.getProductById(productId);

        if(product.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/api/products/purchase")
    @Transactional
    public ResponseEntity<Object> purchase(@RequestParam("id") String vendingMachineId, @RequestBody List<ProductDTO> products) {
        return new ResponseEntity<>(mockApiService.purchase(vendingMachineId, products), HttpStatus.OK);
    }
}
