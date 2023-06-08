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
@Table(name = "favorites")
public class FavoritesEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "favorites_id")
  private Integer favoritesId;
  
  @Column(name = "user_id")
	private Integer userId;

	@Column(name = "vending_machine_id")
	private String vendingMachineId;
   
	@Column(name = "location_name")
	private String locationName;
   
	



	

}
