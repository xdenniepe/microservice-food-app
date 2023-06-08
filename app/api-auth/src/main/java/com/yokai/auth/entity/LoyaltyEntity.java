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
@Table(name = "loyalty_points")
public class LoyaltyEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "loyalty_id")
  private Integer loyaltyId;
  
  @Column(name = "user_id")
	private Integer userId;

	@Column(name = "loyalty_points")
	private Integer points;

	


	

}
