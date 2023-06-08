package com.yokai.payment.entity;

import javax.persistence.*;

import lombok.*;

@Getter
@Setter
@Entity
@Table(name="coupon_discount")
public class CouponDiscount {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coupon_discount_id")
    private Integer couponDiscountId;
    
    @Column(name = "amount")
    private Integer amount;

    @Column(name = "percentage")
    private Integer percentage;

    @OneToOne
	@JoinColumn(name = "coupon_id")
    private Coupon coupon;
}
