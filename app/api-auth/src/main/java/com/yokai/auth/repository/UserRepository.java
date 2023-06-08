package com.yokai.auth.repository;

import java.util.List;
import java.util.Optional;

import com.yokai.auth.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);
  Optional<User> findByUserId(Integer userId);
  Optional<User> findByPhoneNumber(String phoneNumber);
  // Optional<User> findByDateDeleted(Long dateDeleted);
  
  @Query(value = "SELECT COUNT(*) FROM user", nativeQuery = true)
  long count();

  @Transactional
  @Modifying
  @Query(value = "DELETE FROM user WHERE date_deleted < ?1", nativeQuery = true)
  void deleteByDateDeleted(Long dateDeleted);

  @Transactional
  @Modifying
  @Query(value = "UPDATE user e SET e.reward_percentage = ?1 WHERE e.user_id IN ?2", nativeQuery = true)
  Integer updateUserRewardsRepo(Integer rewardPercentage,List<Integer> userId);

  @Transactional
  @Modifying
  @Query( value = "INSERT INTO yokai_web.user (email, password, first_name, last_name, status) VALUES (?1, ?2, ?3, ?4, ?5)", nativeQuery = true)
  void insertUserToWeb(String email, String password, String firstName, String lastName, String status);

  @Transactional
  @Modifying
  @Query( value = "UPDATE yokai_web.user SET password = ?2, first_name = ?3, last_name = ?4 WHERE email = ?1", nativeQuery = true)
  void updateUserInfoWeb(String email, String password, String firstName, String lastName);

  @Query(value = "SELECT COUNT(*) FROM yokai_web.user WHERE email = ?1", nativeQuery = true)
  long findEmailFromWeb(String email);
}
