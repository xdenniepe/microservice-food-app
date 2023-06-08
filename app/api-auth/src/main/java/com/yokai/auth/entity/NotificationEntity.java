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
@Table(name = "notification")
public class NotificationEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "notifId")
  private Integer notifId;
  
  @Column(name = "user_id")
	private Integer userId;

	@Column(name = "category")
	private String category;

	@Column(name = "title")
	private String title;

	@Column(name = "descriptionTitle")
	private String descriptionTitle;
    
	@Column(name = "description")
	private String description;
    
	@Column(name = "path")
	private String path;
    
	@Column(name = "createdAt")
	private String createdAt;
    
	@Column(name = "image")
	private String image;
    
	@Column(name = "seen")
	private Integer seen;


	

}
