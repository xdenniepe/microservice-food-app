package com.yokai.auth.repository;

import java.util.Optional;
import java.util.List;

import com.yokai.auth.entity.Verification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface VerificationRepository extends JpaRepository<Verification, Integer> {

    Optional<Verification> findByUserId(Integer userId);

    Optional<Verification> findByCode(String code);

    Optional<Verification> findByUserIdAndStatus(Integer userId, String activeCode);

    @Transactional
    @Modifying
    @Query(value = "UPDATE verification e SET e.date_deleted = ?1 WHERE e.verification_user_id IN ?2", nativeQuery = true)
    Integer updateVerificationUsers(Long dateDeleted, List<Integer> userId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM verification WHERE date_deleted < ?1", nativeQuery = true)
    void deleteByDateDeletedInVerification(Long dateDeleted);
}
