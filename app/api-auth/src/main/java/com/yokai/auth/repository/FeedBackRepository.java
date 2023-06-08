package com.yokai.auth.repository;

import com.yokai.auth.entity.FeedBackEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface FeedBackRepository extends JpaRepository<FeedBackEntity, Integer> {
   
}