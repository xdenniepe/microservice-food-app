package com.yokai.payment.repository;

import com.yokai.payment.entity.TransactionItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface TransactionItemRepository extends JpaRepository<TransactionItem, Integer> {

}
