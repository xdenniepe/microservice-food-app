package com.yokai.payment.entity;

import javax.persistence.*;

import lombok.*;

@Getter
@Setter
@Entity
@Table(name="coupon")
public class Coupon extends AbstractEntity implements IEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coupon_id")
    private Integer couponId;

    @Column(name="coupon_code")
    private String couponCode;

    @Column(name="status", columnDefinition = "VARCHAR(45) DEFAULT 'NEW'")
    private String status;
    
	@OneToOne(mappedBy = "coupon")
    private CouponDiscount couponDiscount;

	@OneToOne(mappedBy = "coupon")
    private CouponValidity couponValidity;
    
}
