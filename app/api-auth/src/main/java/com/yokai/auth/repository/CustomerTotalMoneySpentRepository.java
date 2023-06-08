package com.yokai.auth.repository;

import com.yokai.auth.entity.CustomerTotalMoneySpentEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
import java.util.List;

@RepositoryRestResource
public interface CustomerTotalMoneySpentRepository extends JpaRepository<CustomerTotalMoneySpentEntity, Integer> {

  
  
    Optional<CustomerTotalMoneySpentEntity> findByUserId(Integer userId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE customer_total_money_spent e SET e.total_spending = ?1 WHERE e.user_id IN ?2", nativeQuery = true)
     Integer updateTotalSpending(Integer orderCount,List<Integer> userId);



    

}