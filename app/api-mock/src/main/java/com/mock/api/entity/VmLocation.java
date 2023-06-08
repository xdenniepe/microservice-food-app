package com.mock.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "vending_machine_location")
public class VmLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vm_location_id")
    private Integer vmLocationId;

    @Column(name = "address")
    private String address;

    @Column(name = "vending_machine_id")
    private String vendingMachineId;

    @Column(name = "latitude")
    private Double lat;

    @Column(name = "longitude")
    private Double lng;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "status")
    private String status;

}
