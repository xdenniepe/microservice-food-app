package com.yokai.auth.repository;

import com.yokai.auth.entity.FavoritesEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
import java.util.List;

@RepositoryRestResource
public interface FavoritesRepository extends JpaRepository<FavoritesEntity, Integer> {

  
  
   
    List<FavoritesEntity> findByUserId(Integer userId);

    Optional<FavoritesEntity> findByUserIdAndVendingMachineId(Integer userId, String vendingMachineId);
    
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM favorites WHERE vending_machine_id IN ?1", nativeQuery = true)
    Integer deleteFavorite(List<String>vendingMachineId);
}