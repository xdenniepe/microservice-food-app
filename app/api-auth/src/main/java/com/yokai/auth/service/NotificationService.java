package com.yokai.auth.service;

import java.util.Optional;

import java.util.List;


import com.yokai.core.dto.NotificationDTO;
import com.yokai.auth.entity.NotificationEntity;
import com.yokai.auth.repository.NotificationRepository;
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
public class NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;
   
   

  public int updateNotifSeen(Integer seen,List<Integer> notifId){
        return notificationRepository.updateNotifSeen(seen, notifId);
    
    }

    public int updateAllNotifSeen(Integer seen,List<Integer> userId){
        return notificationRepository.updateAllNotifSeen(seen, userId);
    
    }


    public int deleteNotif(List<Integer> notifId){
        return  notificationRepository.deleteNotif(notifId);    
    
    }
  
    public int deleteAllNotif(List<Integer> userId){
        return  notificationRepository.deleteAllNotif(userId);    
    
    }
    
}
