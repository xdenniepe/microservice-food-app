package com.yokai.auth.repository;

import com.yokai.auth.entity.LoyaltyEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
import java.util.List;

@RepositoryRestResource
public interface LoyaltyRepository extends JpaRepository<LoyaltyEntity, Integer> {

  
  
    Optional<LoyaltyEntity> findByUserId(Integer userId);


    @Transactional
    @Modifying
    @Query(value = "UPDATE loyalty_points e SET e.loyalty_points = ?1 WHERE e.user_id IN ?2", nativeQuery = true)
    Integer updatePointsRepo(Integer points,List<Integer> userId);


}