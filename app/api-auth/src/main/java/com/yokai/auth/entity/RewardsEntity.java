package com.yokai.auth.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import lombok.Getter;
import lombok.Setter;
import reactor.util.annotation.Nullable;

import java.text.ParseException;
// import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
// import java.time.format.DateTimeFormatter;
// import java.util.Date;
import java.util.Locale;

@Data
@Getter
@Setter
@Entity
@Table(name = "rewards")
public class RewardsEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "rewards_id")
  private Integer rewardsId;
  
  @Column(name = "user_id")
	private Integer userId;

	@Column(name = "percentage")
	private Integer percentage;

	@Column(name = "status")
	private String status;

	@Column(name = "unique_key")
	private String uniqueKey;

	@Column(name = "source")
	private String source;



	

}
