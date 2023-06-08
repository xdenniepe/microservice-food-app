package com.mock.api.repository;


import java.util.List;
import java.util.Optional;

import com.mock.api.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Integer> {
  @Query(value = "SELECT COUNT(*) FROM product", nativeQuery = true)
  long count();

  @Override
  @Query(value = "SELECT a FROM Product a WHERE a.productId = :productId")
  Optional<Product> findById(Integer productId);

  List<Product> findByVendingMachineId(String vendingMachineId);
}
