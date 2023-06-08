package com.yokai.payment.repository;

import java.util.Optional;

import com.yokai.payment.entity.Coupon;
import com.yokai.payment.entity.CouponDiscount;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CouponDiscountRepository extends JpaRepository<CouponDiscount, Integer> {

    Optional<CouponDiscount> findByCoupon(Optional<Coupon> coupon);

}
