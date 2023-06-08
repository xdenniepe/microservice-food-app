package com.yokai.order.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.yokai.core.dto.CartItemDTO;
import com.yokai.core.dto.ProductDTO;
import com.yokai.core.enumerated.CartItemStatusEnum;
import com.yokai.order.apiservice.InventoryApiService;
import com.yokai.order.entity.Order;
import com.yokai.order.entity.ProductOrder;
import com.yokai.order.repository.OrderRepository;
import com.yokai.order.repository.ProductOrderRepository;
import com.yokai.order.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;


@RestController
public class CartController {

    @Autowired
    private ProductService productService;
    
    @Autowired
    private InventoryApiService inventoryApiService;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private ProductOrderRepository poRepo;
    
    /**
     * 
     * @param userId
     * @return
     */
    @GetMapping("/api/cart/items")
    @Transactional
    public ResponseEntity<Object> getCart(@RequestParam("userId") int userId) {
        Optional<Order> order = orderRepo.findByUserId(userId);
        
        if (order.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
            
        List<ProductOrder> entities = poRepo.findByOrderId(order.get().getOrderId());
        
        if (entities.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
         
        List<CartItemDTO> cartItems = setCartItems(entities, order);

        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }

    /**
     * 
     * @param userId
     * @return
     */
    @GetMapping("/api/cart/items/findByOrderId")
    @Transactional
    public ResponseEntity<Object> getCartByOrderId(@RequestParam("orderId") int orderId) {
        Optional<Order> order = orderRepo.findByOrderId(orderId);
        
        if (order.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
            
        List<ProductOrder> entities = poRepo.findByOrderId(order.get().getOrderId());
        
        if (entities.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        
        List<CartItemDTO> cartItems = setCartItems(entities, order);

        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }

    /**
     * 
     * @param entities
     * @param order
     * @return
     */
    public List<CartItemDTO> setCartItems (List<ProductOrder> entities, Optional<Order> order) {
        List<ProductDTO> products = inventoryApiService.getProducts(entities.get(0).getVendingMachineId());
        
        return entities.stream().map(po -> {
            CartItemDTO ci = new CartItemDTO();
           
            ci.setProductId(po.getProductId()); 
            ci.setOrderId(order.get().getOrderId());
            ci.setProductOrderId(po.getProductOrderId());
            ci.setVendorMachineId(po.getVendingMachineId());
            ci.setStatus(CartItemStatusEnum.AVAILABLE);

            Optional<ProductDTO> tmp = productService.getProduct(products, po.getProductId());
           
            if (tmp.isEmpty()) {
                ci.setStatus(CartItemStatusEnum.UNAVAILABLE);
                ci.setPrice(0d);
                ci.setImage(null);
                ci.setTax(0d);
                ci.setSubtotal(0d);
                ci.setTotal(0d);
            } else {
                if (tmp.get().getQuantity() < po.getQuantity()) {
                    ci.setStatus(CartItemStatusEnum.UNAVAILABLE);
                } 

                ci.setPrice(tmp.get().getPrice());
                ci.setQuantity(po.getQuantity());
                ci.setImage(tmp.get().getImage());
                ci.setTax(.1);
                ci.setSubtotal(po.getQuantity() * tmp.get().getPrice());
                ci.setTotal(ci.getSubtotal() + (ci.getSubtotal() * ci.getTax()));
                ci.setName(tmp.get().getName());
                ci.setDescription(tmp.get().getDescription());
            }
           return ci;
        }).collect(Collectors.toList());

    }
}
