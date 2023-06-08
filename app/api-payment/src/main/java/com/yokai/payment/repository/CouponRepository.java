package com.yokai.payment.repository;

import java.util.Optional;

import com.yokai.payment.controller.response.CouponResponse;
import com.yokai.payment.entity.Coupon;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CouponRepository extends JpaRepository<Coupon, Integer> {

    @Query(value = "SELECT COUNT(*) FROM coupon", nativeQuery = true)
    long count();

    @Query(value = "SELECT COUNT(*) FROM coupon WHERE coupon_code = :couponCode LIMIT 1", nativeQuery = true)
    long countByCouponCode(String couponCode);

    Optional<Coupon> findByCouponCode(String couponCode);

    Optional<Coupon> findByCouponId(Integer couponId);
}
