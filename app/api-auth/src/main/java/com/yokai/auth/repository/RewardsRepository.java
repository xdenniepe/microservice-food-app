package com.yokai.auth.repository;

import com.yokai.auth.entity.RewardsEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
import java.util.List;

@RepositoryRestResource
public interface RewardsRepository extends JpaRepository<RewardsEntity, Integer> {

  
  
    List<RewardsEntity> findByUserIdAndStatus(Integer userId, String status);
    Optional<RewardsEntity> findByUniqueKey(String uniqueKey);


    @Transactional
    @Modifying
    @Query(value = "UPDATE rewards e SET e.status = ?1 WHERE e.unique_key IN ?2", nativeQuery = true)
    Integer updateRewardsRepo(String status,List<String> uniqueKey);

    
}