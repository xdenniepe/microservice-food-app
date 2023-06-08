package com.yokai.auth.repository;
import java.util.List;
import java.util.Optional;

import com.yokai.auth.entity.ExternalLogin;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface ExternalLoginRepository extends JpaRepository<ExternalLogin, Integer> {
    Optional<ExternalLogin> findByEmail(String email);
    Optional<ExternalLogin> findByUserId(Integer userId);
    Optional<ExternalLogin> findByUserIdOrSub(Integer userId, String sub);
    Optional<ExternalLogin> findBySub(String sub);
    Boolean existsBySub(String sub);
    Boolean existsByEmail(String email);

    @Transactional
    @Modifying
    @Query(value = "UPDATE external_login e SET e.status = ?1, e.date_deleted = ?2 WHERE e.userId IN ?3", nativeQuery = true)
    Integer updateExternalUsers(String status,Long dateDeleted, List<Integer> userId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM external_login WHERE date_deleted < ?1", nativeQuery = true)
    void deleteByDateDeletedInExternal(Long dateDeleted);

}