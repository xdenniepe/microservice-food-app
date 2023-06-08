package com.yokai.auth.service;

import java.util.Optional;

import java.util.List;


import com.yokai.core.dto.RewardsDTO;
import com.yokai.auth.entity.RewardsEntity;
import com.yokai.auth.repository.RewardsRepository;
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
public class RewardsService {

	@Autowired
	private RewardsRepository rewardsRepository;
   
   

  public int updateRewards(String status,List<String> uniqueKey){
        return rewardsRepository.updateRewardsRepo(status, uniqueKey);
    
    }

    // public int updateVerificationState(Long dateDeleted, List<Integer> userId){
    //     return verificationRepository.updateVerificationUsers(dateDeleted, userId);
    // }
 
}
