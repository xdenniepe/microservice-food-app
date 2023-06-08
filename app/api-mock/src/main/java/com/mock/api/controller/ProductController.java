package com.mock.api.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import com.mock.api.dto.ProductDTO;
import com.mock.api.entity.Product;
import com.mock.api.repository.ProductRepository;
import com.mock.api.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.log4j.Log4j2;

@RestController
@RepositoryRestController
@Log4j2
public class ProductController {

    // @Autowired
    // private WebClient orderClient;

    @Autowired
    private ProductService productService;


    // private DozerBeanMapper dozer;

    // @Autowired
    // public TransactionController() {
    //     this.dozer  = new DozerBeanMapper();
    //     this.dozer.setCustomFieldMapper( new HibernateFieldMapper());
    // }
    
    @GetMapping("/api/products")
    @Transactional
    public ResponseEntity<Object> purchase(@RequestParam("id") String vendingMachineId) throws IOException, NotFoundException {

        return new ResponseEntity<>(productService.getProducts(vendingMachineId), HttpStatus.OK);
    }

    /**
     * 
     * @param productId
     * @return
     * @throws IOException
     * @throws NotFoundException
     */


    @GetMapping("/api/products/findByProductId")
    @Transactional
    public ProductDTO getProductById(@RequestParam("id") Integer productId) {
        return productService.findProductById(productId);
    }

    @PostMapping("/api/products/purchase")
    @Transactional
    public ResponseEntity<Object> purchase(@RequestParam("id") String vendingMachineId, @RequestBody List<Product> req) throws IOException, NotFoundException {
        log.info("purchase.begin()");
        log.info("vendingMachineId:" + vendingMachineId);
        log.info("products:" + req.size());

        return new ResponseEntity<>(productService.purchaseProduct(vendingMachineId, req),HttpStatus.OK);
    }


}
