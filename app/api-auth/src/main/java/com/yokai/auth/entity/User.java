package com.yokai.auth.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;
import reactor.util.annotation.Nullable;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User extends AbstractEntity implements IEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Integer userId;
  
  @Column(name = "email", unique = true)
	private String email;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "status")
	private String status;

	@Column(name = "phone_number")
	private String phoneNumber;

	@JsonIgnore
	@Column(name = "password")
	private String password;

	@Column(name = "one_time_password")
	@Nullable()
	private String oneTimePassword;

	@Column(name = "otp_request_time")
	private Long otpRequestTime;

	@Column(name = "check_pass")
	@Nullable()
	private String checkPass;

	@Column(name = "date_deleted")
	@Nullable()
	private Long dateDeleted;

	@Column(name = "birthday")
	private String birthday;

	@Column(name = "gender")
	private String gender;

	

}
