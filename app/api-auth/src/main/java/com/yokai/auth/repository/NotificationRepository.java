package com.yokai.auth.repository;

import com.yokai.auth.entity.NotificationEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
import java.util.List;

@RepositoryRestResource
public interface NotificationRepository extends JpaRepository<NotificationEntity, Integer> {

  
  
    List<NotificationEntity> findNotifByUserId(Integer userId);

@Transactional
    @Modifying
    @Query(value = "UPDATE notification e SET e.seen = ?1 WHERE e.notifId IN ?2", nativeQuery = true)
    Integer updateNotifSeen(Integer seen,List<Integer> notifId);


@Transactional
    @Modifying
    @Query(value = "UPDATE notification e SET e.seen = ?1 WHERE e.user_id IN ?2", nativeQuery = true)
    Integer updateAllNotifSeen(Integer seen,List<Integer> userId);

@Transactional
    @Modifying
    @Query(value = "DELETE FROM notification WHERE notifId IN ?1", nativeQuery = true)
    Integer deleteNotif(List<Integer>notifId);

@Transactional
    @Modifying
    @Query(value = "DELETE FROM notification WHERE user_id IN ?1", nativeQuery = true)
    Integer deleteAllNotif(List<Integer>userId);


    
}