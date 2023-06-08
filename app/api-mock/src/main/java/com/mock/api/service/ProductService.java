package com.mock.api.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.mock.api.dto.ProductDTO;
import com.mock.api.entity.Product;

import com.mock.api.mapper.ProductMapper;
import com.mock.api.repository.ProductRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class ProductService {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private VmLocationService vmLocationService;
    public boolean hasEnoughStock(List<Product> products, Product product) {
        return products.stream().anyMatch(pr -> pr.getProductId().equals(product.getProductId())
                                                && pr.getQuantity() >= product.getQuantity() );
    }

    public ProductDTO findProductById (Integer productId) {
        Product product  = productRepo.findById(productId).orElse(null);
        return ProductMapper.INSTANCE.entityToDTO(product);
    }



    public Product getProductFromList(List<Product> products, Product product) {
        Optional<Product> tmp = products.stream().filter(pr -> pr.getProductId().equals(product.getProductId()))
                                                 .findFirst();

        if (tmp.isEmpty()) {
            throw new NullPointerException();
        }

        return tmp.get();
    }

    public List<ProductDTO> getProducts(String vendingmachineId) {
        List<Product> products  = productRepo.findByVendingMachineId(vendingmachineId);
        // Rejects the purchase request: due to invalid vendingMachineId
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("Invalid Vending Machine ID!");
        }
        List<ProductDTO> productDTO = products.stream().map(prod -> {
            ProductDTO product = new ProductDTO();
            product = ProductMapper.INSTANCE.entityToDTO(prod);
            return product;
        }).collect(Collectors.toList());

        return productDTO;
    }

    public boolean purchaseProduct(String vendingMachineId, List<Product> req) {

        log.info("purchase.begin()");
        List<ProductDTO> productDTO = getProducts(vendingMachineId);
        List<Product> products = ProductMapper.INSTANCE.dtoListToEntity(productDTO);
        List<Product> purchases = req;

        log.info("vendingMachineId:" + vendingMachineId);
        log.info("products:" + req.size());
        // Rejects the purchase request: due to invalid vendingMachineId

        boolean stockNotEnough = purchases.stream().anyMatch(pu-> !hasEnoughStock(products, pu));

        // Rejects the purchase request due to lacking quantity in stocks
        if (stockNotEnough) {
            throw new ResourceNotFoundException("Insufficient stock!");
        }

        if (products.isEmpty()) {
            throw new ResourceNotFoundException("Invalid vending machine ID!");
        }

        // Update stocks
        purchases.stream().forEach(pu -> {
            Product tmp     = getProductFromList(products, pu);
            int     index   = products.indexOf(tmp);
            log.info("request: " + req);

            products.get(index).setQuantity(tmp.getQuantity() - pu.getQuantity());
        });

        List<Product> updateProdQty =  productRepo.saveAll(products);

        return updateProdQty.isEmpty();
    }
}
