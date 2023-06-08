package com.yokai.auth.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;
import reactor.util.annotation.Nullable;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;

@Data
@Entity
@Table(name = "external_login", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"sub"})
})
public class ExternalLogin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    
    private Integer externalId;
    private Integer userId;
    private String  email;
    private String  type;
    private String  status;
    private String  sub;

	@Column(name = "date_deleted")
	@Nullable()
	private Long dateDeleted;

}