package com.yokai.order.repository;

import java.util.List;
import java.util.Optional;

import com.yokai.order.entity.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Integer> {
  @Query(value = "SELECT COUNT(*) FROM `order`", nativeQuery = true)
  long count();

  @Query(value = "SELECT * FROM `order` WHERE user_id = :userId AND status = 'PENDING' ORDER BY when_added DESC LIMIT 1", nativeQuery = true)
  Optional<Order>  findByUserId(int userId);

  @Query(value = "SELECT * FROM `order` WHERE order_id = :orderId LIMIT 1", nativeQuery = true)
  Optional<Order>  findByOrderId(Integer orderId);

  @Query(value = "SELECT * FROM `order` WHERE user_id = :userId AND status = 'COMPLETED' ORDER BY when_added DESC", nativeQuery = true)
  List<Order>  findAllCompletedByUserId(Integer userId);


}
