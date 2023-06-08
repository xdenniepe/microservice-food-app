package com.yokai.auth.service;

import java.util.Optional;

import java.util.List;


import com.yokai.core.dto.FavoritesDTO;
import com.yokai.auth.entity.FavoritesEntity;
import com.yokai.auth.repository.FavoritesRepository;
import com.yokai.auth.utility.Constants;
import com.yokai.core.utility.Utility;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
public class FavoritesService {

	@Autowired
	private FavoritesRepository favoritesRepository;
   


    public int deleteFavorite(List<String> vendingMachineId){
        return  favoritesRepository.deleteFavorite(vendingMachineId);    
    
    }
  
}
