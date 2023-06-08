package com.yokai.payment.entity;

import javax.persistence.*;

import lombok.*;

@Getter
@Setter
@Entity
@Table(name="coupon_validity")
public class CouponValidity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coupon_validity_id")
    private Integer couponValidityId;

    @Column(name = "times_used")
    private Integer timesUsed;

    @Column(name = "expiration_date")
    private Integer expirationDate;

    @OneToOne
	@JoinColumn(name = "coupon_id")
    private Coupon coupon;
}
