package com.yokai.payment.repository;

import java.util.Optional;

import com.yokai.payment.entity.Coupon;
import com.yokai.payment.entity.CouponValidity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CouponValidityRepository extends JpaRepository<CouponValidity, Integer> {

    Optional<CouponValidity> findByCoupon(Optional<Coupon> coupon);
    
}
