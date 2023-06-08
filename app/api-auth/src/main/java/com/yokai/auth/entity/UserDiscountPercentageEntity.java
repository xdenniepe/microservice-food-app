package com.yokai.auth.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import lombok.Getter;
import lombok.Setter;
import reactor.util.annotation.Nullable;

import java.text.ParseException;
import java.time.Instant;
import java.time.ZoneId;
import java.util.Locale;

@Data
@Getter
@Setter
@Entity
@Table(name = "user_discount_percentage")
public class UserDiscountPercentageEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "discount_id")
  private Integer discountId;
  
  @Column(name = "user_id")
	private Integer userId;

	@Column(name = "percentage")
	private Integer percentage;

	


	

}
