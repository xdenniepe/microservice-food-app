package com.mock.api.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Integer productId;

	@Column(name = "vending_machine_id")
	private String vendingMachineId;

  	@Column(name = "name", unique = true)
	private String name;

	@Column(name = "price")
	private Double price;

	@Column(name = "description")
	private String description;

	@Column(name = "quantity")
	private Integer quantity;

	@Column(name = "more_info")
	private String info;	

	@Column(name = "image")
	private String image;

	@Column(name = "status")
	private String status;	

}
