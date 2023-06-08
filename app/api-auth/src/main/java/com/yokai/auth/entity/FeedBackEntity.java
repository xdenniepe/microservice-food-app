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
@Table(name = "feedback_form")
public class FeedBackEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    
    private Integer feedBackId;
    private String  name;
    private String  email;
    private String  reason;
    private String  description;
    
    @Column(name = "when_added", nullable = true)
    protected Integer whenAdded;

    @Column(name = "timestamp", nullable = true)
    protected Integer timestamp;

    @PrePersist
    protected void onCreate() {
        Long unixTime = Instant.now().getEpochSecond();
        this.whenAdded = this.timestamp = unixTime.intValue();
    }

    @PreUpdate
    protected void onUpdate() {
        Long unixTime = Instant.now().getEpochSecond();
        this.timestamp = unixTime.intValue();
    }

}