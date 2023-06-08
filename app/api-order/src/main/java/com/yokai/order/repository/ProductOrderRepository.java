package com.yokai.order.repository;

import java.util.List;
import java.util.Optional;

import com.yokai.order.entity.ProductOrder;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProductOrderRepository extends JpaRepository<ProductOrder, Integer> {
  @Query(value = "SELECT COUNT(*) FROM product_order", nativeQuery = true)
  long count();
  
  @Query(value = "SELECT * FROM product_order WHERE product_id = :productId AND order_id = :orderId LIMIT 1", nativeQuery = true)
  Optional<ProductOrder> findProductOrder(int productId, int orderId);

  @Query(value = "SELECT * FROM product_order WHERE order_id = :orderId", nativeQuery = true)
  List<ProductOrder> findByOrderId(int orderId);
}
