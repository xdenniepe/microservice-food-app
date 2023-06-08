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

//this is table for dynamically changing of tier system settings
@Table(name = "loyalty_tier_list")
public class LoyaltyTierListEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "loyalty_tier_list_id")
  private Integer tierListId;
  
  @Column(name = "tier_name")
	private String tierName;

    //use Hex
	@Column(name = "tier_color")
	private String tierColor;

    @Column(name = "tier_lowest_money_spent")
	private Integer tierLowestMoneySpent;

    @Column(name = "tier_highest_money_spent")
	private Integer tierHighestMoneySpent;

    @Column(name = "tier_promotion_percent")
	private Integer tierPromotionPercentage;



	


	

}
