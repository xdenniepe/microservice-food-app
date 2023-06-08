package com.yokai.auth.service;

import java.util.Optional;

import java.util.List;


import com.yokai.core.dto.CustomerTotalMoneySpentDTO;
import com.yokai.auth.entity.CustomerTotalMoneySpentEntity;
import com.yokai.auth.repository.CustomerTotalMoneySpentRepository;
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
public class CustomerTotalMoneySpentService {

	@Autowired
	private CustomerTotalMoneySpentRepository customerTotalMoneySpentRepository;
   
   

  public int updateTotalSpending(Integer totalSpending,List<Integer> userId){
        return customerTotalMoneySpentRepository.updateTotalSpending(totalSpending, userId);
    
    }


 
}
