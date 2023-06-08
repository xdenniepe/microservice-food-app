package com.yokai.payment.controller;

import java.util.Optional;

import com.yokai.payment.controller.request.CouponRequest;
import com.yokai.payment.controller.response.CouponResponse;
import com.yokai.payment.entity.Coupon;
import com.yokai.payment.entity.CouponDiscount;
import com.yokai.payment.entity.CouponValidity;
import com.yokai.payment.repository.CouponDiscountRepository;
import com.yokai.payment.repository.CouponRepository;
import com.yokai.payment.repository.CouponValidityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RepositoryRestController
public class CouponController {

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private CouponDiscountRepository couponDiscountRepository;

    @Autowired
    private CouponValidityRepository couponValidityRepository;

    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/api/coupons/create")
    public ResponseEntity<Object> addCoupon(@RequestBody CouponRequest request){
        Coupon coupon = new Coupon();
        CouponDiscount couponDiscount = new CouponDiscount();
        CouponValidity couponValidity = new CouponValidity();

        coupon.setCouponCode(request.getCouponCode());
        coupon.setStatus(request.getStatus());
        couponRepository.save(coupon);

        couponDiscount.setAmount(request.getAmount());
        couponDiscount.setPercentage(request.getPercentage());
        couponDiscount.setCoupon(coupon);
        couponDiscountRepository.save(couponDiscount);

        couponValidity.setTimesUsed(request.getTimesUsed());
        couponValidity.setExpirationDate(request.getExpirationDate());
        couponValidity.setCoupon(coupon);
        couponValidityRepository.save(couponValidity);

        return new ResponseEntity<>(coupon, HttpStatus.OK);
    }

    /**
     * 
     * @param couponCode
     * @return
     */
    @GetMapping("/api/coupons/findByCouponCode")
    public ResponseEntity<CouponResponse> checkCouponCode(@RequestParam("couponCode") String couponCode) {
        Optional<Coupon>         coupon         = couponRepository.findByCouponCode(couponCode);
        Optional<CouponDiscount> couponDiscount = couponDiscountRepository.findByCoupon(coupon);
        Optional<CouponValidity> couponValidity = couponValidityRepository.findByCoupon(coupon);

        if(coupon.isPresent() && couponDiscount.isPresent() && couponValidity.isPresent()){
            CouponResponse couponResponse = setCouponDetails(coupon, couponDiscount, couponValidity);

            return new ResponseEntity<>(couponResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 
     * @param couponId
     * @return
     */
    @GetMapping("/api/coupons/findByCouponId")
    public ResponseEntity<CouponResponse> getCouponDetails(@RequestParam("couponId") Integer couponId) {
        Optional<Coupon> coupon = couponRepository.findByCouponId(couponId);
        Optional<CouponDiscount> couponDiscount = couponDiscountRepository.findByCoupon(coupon);
        Optional<CouponValidity> couponValidity = couponValidityRepository.findByCoupon(coupon);

        if(coupon.isPresent() && couponDiscount.isPresent() && couponValidity.isPresent()) {
            CouponResponse couponResponse = setCouponDetails(coupon, couponDiscount, couponValidity);

            return new ResponseEntity<>(couponResponse, HttpStatus.OK);
        } else {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 
     * @param coupon
     * @param couponDiscount
     * @param couponValidity
     * @return
     */
    public CouponResponse setCouponDetails(Optional<Coupon> coupon, Optional<CouponDiscount> couponDiscount, Optional<CouponValidity> couponValidity) {
        CouponResponse couponResponse = new CouponResponse();

        if(coupon.isPresent() && couponDiscount.isPresent() && couponValidity.isPresent()){
            couponResponse.setCouponId(coupon.get().getCouponId());
            couponResponse.setCouponCode(coupon.get().getCouponCode());
            couponResponse.setStatus(coupon.get().getStatus());
            couponResponse.setAmount(couponDiscount.get().getAmount());
            couponResponse.setPercentage(couponDiscount.get().getPercentage());
            couponResponse.setTimesUsed(couponValidity.get().getTimesUsed());
            couponResponse.setExpirationDate(couponValidity.get().getExpirationDate());

            return couponResponse;
        }
        return null;
    }
}
