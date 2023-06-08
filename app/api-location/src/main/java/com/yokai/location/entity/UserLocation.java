package com.yokai.location.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name= "user_default_location")
public class UserLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "default_location_id")
    private Integer userDefaultLocationId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "vending_machine_id")
    private String vendingMachineId;

}