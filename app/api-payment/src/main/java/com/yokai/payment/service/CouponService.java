package com.yokai.payment.service;

import java.util.Optional;

import com.yokai.core.utility.Utility;
import com.yokai.payment.controller.CouponController;
import com.yokai.payment.controller.response.CouponResponse;
import com.yokai.payment.entity.Coupon;
import com.yokai.payment.entity.CouponDiscount;
import com.yokai.payment.entity.CouponValidity;
import com.yokai.payment.repository.CouponDiscountRepository;
import com.yokai.payment.repository.CouponRepository;
import com.yokai.payment.repository.CouponValidityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CouponService {
    @Autowired
    CouponRepository couponRepository;

    @Autowired
    CouponDiscountRepository couponDiscountRepository;

    @Autowired
    CouponValidityRepository couponValidityRepository;

    @Autowired
    CouponController couponController;

    public Double applyCoupon(Optional<CouponResponse> coupon, Double total) {
        if (coupon.isPresent() && coupon.get().getAmount() != null) {
            Double value = Double.valueOf(coupon.get().getAmount());
            return Utility.formatDouble(total - value, 2);
        } else if (coupon.isPresent() && coupon.get().getPercentage() != null) {
            Double percentage = Double.valueOf(total * (coupon.get().getPercentage()/Double.valueOf(100)));
            return Utility.formatDouble(total - percentage, 2);
        } else {
            return Utility.formatDouble(total, 2); 
        }
    }

    public CouponResponse checkCoupon(String couponCode) {
        Optional<Coupon>         coupon         = couponRepository.findByCouponCode(couponCode);
        Optional<CouponDiscount> couponDiscount = couponDiscountRepository.findByCoupon(coupon);
        Optional<CouponValidity> couponValidity = couponValidityRepository.findByCoupon(coupon);

        if(coupon.isPresent() && couponDiscount.isPresent() && couponValidity.isPresent()){
            CouponResponse couponResponse = couponController.setCouponDetails(coupon, couponDiscount, couponValidity);

            return couponResponse;
        }
        return null; 
    }
}
