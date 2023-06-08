package com.yokai.auth.service;

import java.util.Optional;

import java.util.List;


import com.yokai.core.dto.LoyaltyDTO;
import com.yokai.auth.entity.LoyaltyEntity;
import com.yokai.auth.repository.LoyaltyRepository;
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
public class LoyaltyService {

	@Autowired
	private LoyaltyRepository loyaltyRepository;
   
   

  public int updatePoints(Integer points,List<Integer> userId){
        return loyaltyRepository.updatePointsRepo(points, userId);
    
    }


 
}
