package com.yokai.location.repository;

import com.yokai.location.entity.UserLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserLocationRepository extends JpaRepository<UserLocation, Integer> {

    @Query(value = "SELECT * FROM `user_default_location` WHERE user_id = :userId", nativeQuery = true)
    Optional<UserLocation> findByUserId(Integer userId);
}
