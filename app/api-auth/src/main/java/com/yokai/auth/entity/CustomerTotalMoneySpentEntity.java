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

//this is table for customer loyalty that counts their total money spent

@Table(name = "customer_total_money_spent")
public class CustomerTotalMoneySpentEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "customer_total_money_spent_id")
  private Integer customerTotalMoneySpentId;
  
  @Column(name = "user_id")
	private Integer userId;

	@Column(name = "total_spending")
	private Integer totalSpending;

	


	

}
