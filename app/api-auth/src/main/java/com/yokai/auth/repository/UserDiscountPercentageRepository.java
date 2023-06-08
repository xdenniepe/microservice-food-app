package com.yokai.auth.repository;

import com.yokai.auth.entity.UserDiscountPercentageEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
import java.util.List;

@RepositoryRestResource
public interface UserDiscountPercentageRepository extends JpaRepository<UserDiscountPercentageEntity, Integer> {

  
  
      Optional<UserDiscountPercentageEntity> findByUserId(Integer userId);




    @Transactional
    @Modifying
    @Query(value = "UPDATE user_discount_percentage e SET e.percentage = ?1 WHERE e.user_id IN ?2", nativeQuery = true)
    Integer updateUserDiscount(Integer percentage,List<Integer> userId);


    
}