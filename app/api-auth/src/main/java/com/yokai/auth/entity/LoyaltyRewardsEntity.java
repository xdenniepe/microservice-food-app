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
@Table(name = "loyalty_rewards")
public class LoyaltyRewardsEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "loyalty_reward_id")
  private Integer loyaltyRewardId;
  
  @Column(name = "percent")
	private Integer percent;

	@Column(name = "points")
	private Integer loyaltyRewardPoints;
    
	@Column(name = "unique_key")
	private Integer uniqueKey;

  
	@Column(name = "tier")
	private Integer tierNumber;

	


	

}
